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

    const { role, domain } = await request.json();

    if (!role || !domain) {
      return NextResponse.json({ error: 'Role and domain are required' }, { status: 400 });
    }

    // Get user ID from session
    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    // Create new interview session
    const interviewSession = await prisma.interviewSession.create({
      data: {
        userId,
        userRole: (session.user as any).role || 'jobseeker',
        role,
        domain,
        status: 'active'
      }
    });

    return NextResponse.json({ 
      success: true, 
      sessionId: interviewSession.id,
      role,
      domain,
      createdAt: interviewSession.createdAt
    });

  } catch (error) {
    console.error('Error starting interview session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    // Get user's interview history
    const interviewSessions = await prisma.interviewSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        questions: {
          include: {
            answers: {
              include: {
                feedback: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      sessions: interviewSessions
    });

  } catch (error) {
    console.error('Error fetching interview sessions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


