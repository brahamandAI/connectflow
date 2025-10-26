import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PATCH /api/connections/[id] - Accept or decline a connection request
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = (session.user as any).id;
    const { id } = await params;
    const body = await request.json();
    const { action } = body; // 'accept' or 'decline'

    if (!['accept', 'decline'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "accept" or "decline"' },
        { status: 400 }
      );
    }

    // Find the connection request
    const connection = await prisma.connection.findUnique({
      where: { id }
    });

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      );
    }

    // Check if current user is the recipient of the request
    if (connection.connectedUserId !== currentUserId) {
      return NextResponse.json(
        { error: 'You can only respond to connection requests sent to you' },
        { status: 403 }
      );
    }

    if (connection.status !== 'pending') {
      return NextResponse.json(
        { error: 'Connection request has already been processed' },
        { status: 400 }
      );
    }

    // Update connection status
    const updatedConnection = await prisma.connection.update({
      where: { id },
      data: {
        status: action === 'accept' ? 'accepted' : 'declined',
        ...(action === 'accept' && { acceptedAt: new Date() })
      }
    });

    // Fetch user details separately
    const [user, connectedUser] = await Promise.all([
      prisma.user.findUnique({
        where: { id: connection.userId },
        select: {
          id: true,
          fullName: true,
          profileImage: true,
          headline: true,
          role: true,
          companyName: true
        }
      }),
      prisma.user.findUnique({
        where: { id: connection.connectedUserId },
        select: {
          id: true,
          fullName: true,
          profileImage: true,
          headline: true,
          role: true,
          companyName: true
        }
      })
    ]);

    // Create notification for the original requester
    const notificationData = {
      connectionId: id,
      responderId: currentUserId,
      responderName: connectedUser?.fullName,
      responderProfileImage: connectedUser?.profileImage,
      responderHeadline: connectedUser?.headline,
      responderRole: connectedUser?.role,
      responderCompany: connectedUser?.companyName
    };

    await prisma.notification.create({
      data: {
        userId: connection.userId,
        type: action === 'accept' ? 'connection_accepted' : 'connection_declined',
        title: action === 'accept' ? 'Connection Accepted' : 'Connection Declined',
        message: action === 'accept' 
          ? `${connectedUser?.fullName} accepted your connection request`
          : `${connectedUser?.fullName} declined your connection request`,
        data: JSON.stringify(notificationData)
      }
    });

    return NextResponse.json({ ...updatedConnection, user, connectedUser });
  } catch (error) {
    console.error('Error updating connection:', error);
    return NextResponse.json(
      { error: 'Failed to update connection' },
      { status: 500 }
    );
  }
}

// DELETE /api/connections/[id] - Remove a connection
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = (session.user as any).id;
    const { id } = await params;

    // Find the connection
    const connection = await prisma.connection.findUnique({
      where: { id }
    });

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      );
    }

    // Check if current user is part of this connection
    if (connection.userId !== currentUserId && connection.connectedUserId !== currentUserId) {
      return NextResponse.json(
        { error: 'You can only remove your own connections' },
        { status: 403 }
      );
    }

    // Delete the connection
    await prisma.connection.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Connection removed successfully' });
  } catch (error) {
    console.error('Error deleting connection:', error);
    return NextResponse.json(
      { error: 'Failed to delete connection' },
      { status: 500 }
    );
  }
}

