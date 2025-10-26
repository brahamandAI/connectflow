import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateInterviewQuestions, generateFallbackQuestions } from '@/lib/ai-utils';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    const { role, domain } = await request.json();

    if (!role || !domain) {
      return NextResponse.json(
        { error: 'Role and domain are required' },
        { status: 400 }
      );
    }

    // Create interview session
    const interviewSession = await prisma.interviewSession.create({
      data: {
        userId: userId,
        userRole: (session.user as any).role || 'jobseeker',
        role,
        domain,
        status: 'active',
        totalQuestions: 5,
        currentQuestion: 1,
      },
    });

    let questions;
    try {
      // Try to generate questions using AI
      questions = await generateInterviewQuestions(role, domain);
    } catch (error) {
      console.error('AI question generation failed, using fallback:', error);
      // Use fallback questions if AI fails
      questions = generateFallbackQuestions(role, domain);
    }

    // Save questions to database
    const savedQuestions = await Promise.all(
      questions.map((question, index) =>
        prisma.question.create({
          data: {
            sessionId: interviewSession.id,
            text: question.text || question.question, // Handle both formats
            category: question.category,
            difficulty: question.difficulty,
            orderIndex: question.orderIndex || index + 1,
            aiGenerated: question.aiGenerated !== false,
            expectedAnswer: question.expectedAnswer,
            tips: question.tips || [],
          },
        })
      )
    );

    return NextResponse.json({
      id: interviewSession.id,
      sessionId: interviewSession.id,
      role: interviewSession.role,
      domain: interviewSession.domain,
      questions: savedQuestions,
      message: 'Interview session created successfully',
    });
  } catch (error) {
    console.error('Error generating interview:', error);
    return NextResponse.json(
      { error: 'Failed to generate interview' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get interview session with questions
    const interviewSession = await prisma.interviewSession.findUnique({
      where: { id: sessionId },
      include: {
        questions: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!interviewSession) {
      return NextResponse.json(
        { error: 'Interview session not found' },
        { status: 404 }
      );
    }

    // Check if user owns this session
    if (interviewSession.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(interviewSession);
  } catch (error) {
    console.error('Error fetching interview session:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview session' },
      { status: 500 }
    );
  }
}




