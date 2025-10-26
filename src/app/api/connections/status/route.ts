import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/connections/status - Check connection status between current user and target user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Get current user from session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const currentUserId = (session.user as any).id;

    // Check if database is available
    if (!prisma || !prisma.connection) {
      return NextResponse.json({
        status: 'none'
      });
    }

    // Check for existing connection (either direction)
    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          {
            userId: currentUserId,
            connectedUserId: userId
          },
          {
            userId: userId,
            connectedUserId: currentUserId
          }
        ]
      }
    });

    if (!connection) {
      return NextResponse.json({
        status: 'none'
      });
    }

    return NextResponse.json({
      status: connection.status
    });

  } catch (error) {
    console.error('Error checking connection status:', error);
    return NextResponse.json(
      { error: 'Failed to check connection status' },
      { status: 500 }
    );
  }
}
