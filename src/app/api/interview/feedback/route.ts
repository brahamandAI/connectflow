import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateFeedback, generateFallbackFeedback, transcribeAudio, generateFollowUpQuestion, generateFallbackFollowUpQuestion, generateComprehensiveFeedback, generateFallbackComprehensiveFeedback } from '@/lib/ai-utils';

export async function POST(request: NextRequest) {
  try {
    console.log('=== INTERVIEW FEEDBACK API CALLED ===');
    
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { questionId, audioData, videoUrl, duration, transcript, role, domain, conversationHistory, generateFollowUp, isIntroduction, isFinalFeedback } = await request.json();
    
    console.log('Request parameters:', {
      hasQuestionId: !!questionId,
      hasAudioData: !!audioData,
      hasTranscript: !!transcript,
      role,
      domain,
      generateFollowUp,
      isIntroduction,
      conversationHistoryLength: conversationHistory?.length || 0
    });

    // For new interview flow, we don't need questionId
    if (!questionId && !transcript) {
      return NextResponse.json(
        { error: 'Either questionId or transcript is required' },
        { status: 400 }
      );
    }

    let question = null;
    let transcriptText = '';
    let confidence = 0;

    // Handle new interview flow (with transcript)
    if (transcript) {
      transcriptText = transcript;
      confidence = 0.9; // High confidence for provided transcript
    } 
    // Handle old flow (with questionId and audioData)
    else if (questionId) {
      question = await prisma.question.findUnique({
        where: { id: questionId },
        include: {
          session: true,
        },
      });

      if (!question) {
        return NextResponse.json(
          { error: 'Question not found' },
          { status: 404 }
        );
      }

      // Check if user owns this question's session
      if (question.session.userId !== (session?.user as any)?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // If audio data is provided, transcribe it
      if (audioData) {
        try {
          transcriptText = await transcribeAudio(audioData);
          confidence = 0.9; // High confidence for successful transcription
        } catch (error) {
          console.error('Transcription failed:', error);
          return NextResponse.json(
            { error: 'Failed to transcribe audio' },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'Audio data is required' },
          { status: 400 }
        );
      }
    }

    // For new interview flow, we don't create database records
    let answer = null;
    let feedback = null;

    if (question) {
      // Create answer record for old flow
      answer = await prisma.answer.create({
        data: {
          questionId,
          transcript: transcriptText,
          videoUrl,
          duration,
          confidence,
        },
      });

      // Generate AI feedback
      try {
        feedback = await generateFeedback(
          question.text,
          transcriptText
        );
      } catch (error) {
        console.error('AI feedback generation failed, using fallback:', error);
        feedback = generateFallbackFeedback(question.text, transcriptText);
      }
    } else {
      // For new interview flow, generate feedback without database storage
      try {
        const questionText = isIntroduction ? "Tell me about yourself" : "Interview question";
        feedback = await generateFeedback(questionText, transcriptText);
      } catch (error) {
        console.error('AI feedback generation failed, using fallback:', error);
        feedback = generateFallbackFeedback("Interview question", transcriptText);
      }
    }

    // Save feedback to database only for old flow
    let savedFeedback = null;
    if (answer) {
      savedFeedback = await prisma.feedback.create({
        data: {
          answerId: answer.id,
          score: feedback.score,
          communicationScore: feedback.communicationScore,
          technicalScore: feedback.technicalScore,
          strengths: feedback.strengths,
          weaknesses: feedback.weaknesses,
          suggestions: feedback.suggestions,
          overallFeedback: feedback.overallFeedback,
        },
      });
    }

    // Update interview session progress only for old flow
    if (question) {
      const sessionId = question.sessionId;
      const currentSession = await prisma.interviewSession.findUnique({
        where: { id: sessionId },
        include: {
          questions: {
            include: {
              answers: {
                include: {
                  feedback: true,
                },
              },
            },
          },
        },
      });

      if (currentSession) {
        const totalQuestions = currentSession.questions.length;
        const answeredQuestions = currentSession.questions.filter(q => q.answers.length > 0).length;
        const totalScore = currentSession.questions.reduce((acc, q) => {
          const answer = q.answers[0];
          return acc + (answer?.feedback?.score || 0);
        }, 0);
        const averageScore = answeredQuestions > 0 ? totalScore / answeredQuestions : 0;

        await prisma.interviewSession.update({
          where: { id: sessionId },
          data: {
            currentQuestion: answeredQuestions + 1,
            totalScore,
            averageScore,
            status: answeredQuestions >= totalQuestions ? 'completed' : 'active',
            completedAt: answeredQuestions >= totalQuestions ? new Date() : null,
          },
        });
      }
    }

    // Generate follow-up question for new interview flow
    let followUpQuestion = null;
    console.log('Follow-up generation check:', { 
      generateFollowUp, 
      hasQuestion: !!question, 
      role, 
      domain,
      transcriptLength: transcriptText.length,
      conversationHistoryLength: conversationHistory?.length || 0
    });
    
    // For new interview flow, we should always generate follow-up questions when requested
    if (generateFollowUp) {
      try {
        console.log('Generating follow-up question...');
        followUpQuestion = await generateFollowUpQuestion(
          role,
          domain,
          transcriptText,
          conversationHistory,
          isIntroduction
        );
        console.log('Generated follow-up question:', followUpQuestion);
      } catch (error) {
        console.error('Follow-up question generation failed:', error);
        // Use fallback follow-up question
        followUpQuestion = generateFallbackFollowUpQuestion(role, domain, isIntroduction);
        console.log('Using fallback follow-up question:', followUpQuestion);
      }
    } else {
      console.log('Skipping follow-up generation - generateFollowUp is false');
    }

    // Generate final comprehensive feedback if requested
    let finalFeedback = null;
    if (isFinalFeedback) {
      try {
        console.log('Generating final comprehensive feedback...');
        
        const questionCount = conversationHistory ? Math.floor(conversationHistory.length / 2) : 1;
        finalFeedback = await generateComprehensiveFeedback(role, domain, transcript, questionCount);
        console.log('Generated final feedback:', finalFeedback);
        
      } catch (error) {
        console.error('Final feedback generation failed:', error);
        finalFeedback = generateFallbackComprehensiveFeedback();
      }
    }

    return NextResponse.json({
      answer,
      feedback: savedFeedback || feedback,
      followUpQuestion,
      finalFeedback,
      message: 'Answer submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: `Failed to submit answer: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const answerId = searchParams.get('answerId');

    if (!answerId) {
      return NextResponse.json(
        { error: 'Answer ID is required' },
        { status: 400 }
      );
    }

    // Get answer with related data
    const answer = await prisma.answer.findUnique({
      where: { id: answerId },
      include: {
        question: {
          include: {
            session: true,
          },
        },
        feedback: true,
      },
    });

    if (!answer) {
      return NextResponse.json(
        { error: 'Answer not found' },
        { status: 404 }
      );
    }

    // Check if user owns this answer's session
    if (answer.question.session.userId !== (session?.user as any)?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(answer);
  } catch (error) {
    console.error('Error fetching answer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch answer' },
      { status: 500 }
    );
  }
}




