import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/notifications - Get user's notifications
export async function GET(request: NextRequest) {
  try {
    console.log('=== NOTIFICATIONS API ===');
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    console.log('Session user:', session?.user);
    
    if (!session?.user) {
      console.log('No session found, returning 401');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = (session.user as any).id;
    console.log('Current user ID:', currentUserId);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    const skip = (page - 1) * limit;

    // Check if user exists in the unified User table
    const user = await prisma.user.findUnique({ 
      where: { id: currentUserId } 
    });

    if (!user) {
      console.log('User not found in User table');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const whereClause = {
      userId: currentUserId,
      ...(unreadOnly && { isRead: false })
    };

    const notifications = await prisma.notification.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    const total = await prisma.notification.count({
      where: whereClause
    });

    const unreadCount = await prisma.notification.count({
      where: {
        userId: currentUserId,
        isRead: false
      }
    });

    console.log('Found notifications:', notifications.length);
    console.log('Unread count:', unreadCount);

    const response = {
      notifications,
      pagination: {
        page,
        limit,
        total,
        hasNext: skip + limit < total
      },
      unreadCount
    };

    console.log('Returning response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// POST /api/notifications - Create a new notification
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId, type, title, message, data } = body;

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, type, title, message' },
        { status: 400 }
      );
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data: data ? JSON.stringify(data) : null
      }
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

