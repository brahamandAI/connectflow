import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      questionId, 
      sessionId, 
      transcript, 
      videoUrl, 
      audioUrl, 
      duration 
    } = await request.json();

    if (!questionId || !sessionId || !transcript) {
      return NextResponse.json({ 
        error: 'Question ID, session ID, and transcript are required' 
      }, { status: 400 });
    }

    // Get user ID from session
    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    // Verify the session belongs to the user
    const sessionExists = await prisma.interviewSession.findFirst({
      where: { id: sessionId, userId }
    });

    if (!sessionExists) {
      return NextResponse.json({ error: 'Interview session not found' }, { status: 404 });
    }

    // Create the answer
    const answer = await prisma.answer.create({
      data: {
        questionId,
        transcript,
        videoUrl: videoUrl || null,
        audioUrl: audioUrl || null,
        duration: duration || null
      }
    });

    return NextResponse.json({ 
      success: true, 
      answerId: answer.id,
      message: 'Answer saved successfully'
    });

  } catch (error) {
    console.error('Error saving answer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { answerId, transcript, videoUrl, audioUrl, duration } = await request.json();

    if (!answerId) {
      return NextResponse.json({ error: 'Answer ID is required' }, { status: 400 });
    }

    // Get user ID from session
    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    // Verify the answer belongs to the user
    const answerExists = await prisma.answer.findFirst({
      where: { 
        id: answerId,
        question: {
          session: { userId }
        }
      }
    });

    if (!answerExists) {
      return NextResponse.json({ error: 'Answer not found' }, { status: 404 });
    }

    // Update the answer
    const updatedAnswer = await prisma.answer.update({
      where: { id: answerId },
      data: {
        transcript: transcript || answerExists.transcript,
        videoUrl: videoUrl || answerExists.videoUrl,
        audioUrl: audioUrl || answerExists.audioUrl,
        duration: duration || answerExists.duration
      }
    });

    return NextResponse.json({ 
      success: true, 
      answer: updatedAnswer,
      message: 'Answer updated successfully'
    });

  } catch (error) {
    console.error('Error updating answer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}




