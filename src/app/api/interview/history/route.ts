import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status'); // 'active', 'completed', 'paused'

    // Build where clause
    const whereClause: any = {
      userId: userId,
    };

    if (status) {
      whereClause.status = status;
    }

    // Get interview sessions with questions and answers
    const interviewSessions = await prisma.interviewSession.findMany({
      where: whereClause,
      include: {
        questions: {
          include: {
            answers: {
              include: {
                feedback: true,
              },
            },
          },
          orderBy: { orderIndex: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    // Get total count for pagination
    const totalCount = await prisma.interviewSession.count({
      where: whereClause,
    });

    // Calculate additional stats
    const stats = await prisma.interviewSession.aggregate({
      where: {
        userId: userId,
        status: 'completed',
      },
      _avg: {
        averageScore: true,
        totalScore: true,
      },
      _count: {
        id: true,
      },
    });

    return NextResponse.json({
      sessions: interviewSessions,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
      stats: {
        totalCompleted: stats._count.id,
        averageScore: stats._avg.averageScore || 0,
        totalScore: stats._avg.totalScore || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching interview history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview history' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    // Check if user owns this session
    const interviewSession = await prisma.interviewSession.findUnique({
      where: { id: sessionId },
    });

    if (!interviewSession) {
      return NextResponse.json(
        { error: 'Interview session not found' },
        { status: 404 }
      );
    }

    if (interviewSession.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete session and all related data (cascade)
    await prisma.interviewSession.delete({
      where: { id: sessionId },
    });

    return NextResponse.json({
      message: 'Interview session deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting interview session:', error);
    return NextResponse.json(
      { error: 'Failed to delete interview session' },
      { status: 500 }
    );
  }
}
