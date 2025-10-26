import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
// Define the question type locally
interface InterviewQuestion {
  question: string;
  category: string;
  difficulty: string;
  expectedAnswer?: string;
  tips?: string[];
  orderIndex?: number;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId, questions } = await request.json();

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return NextResponse.json({ 
        error: 'Session ID and questions array are required' 
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

    // Save all questions to the database
    const savedQuestions = await Promise.all(
      questions.map((question: InterviewQuestion) =>
        prisma.question.create({
          data: {
            sessionId,
            text: question.question,
            category: question.category,
            difficulty: question.difficulty,
            expectedAnswer: question.expectedAnswer || null,
            tips: question.tips || [],
            orderIndex: question.orderIndex || 1,
            aiGenerated: true
          }
        })
      )
    );

    return NextResponse.json({ 
      success: true, 
      questions: savedQuestions,
      message: 'Questions saved successfully'
    });

  } catch (error) {
    console.error('Error saving questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

