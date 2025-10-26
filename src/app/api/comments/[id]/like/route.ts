import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/comments/[id]/like - Like or unlike a comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, userRole } = body;

    if (!userId || !userRole) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, userRole' },
        { status: 400 }
      );
    }

    // Check if user already liked this comment
    const existingLike = await prisma.commentLike.findUnique({
      where: {
        commentId_userId: {
          commentId: id,
          userId: userId,
        }
      }
    });

    if (existingLike) {
      // Unlike the comment
      await prisma.commentLike.delete({
        where: { id: existingLike.id }
      });

      // Update comment likes count
      await prisma.comment.update({
        where: { id: id },
        data: {
          likesCount: {
            decrement: 1
          }
        }
      });

      return NextResponse.json({ 
        message: 'Comment unliked successfully',
        isLiked: false 
      });
    } else {
      // Like the comment
      await prisma.commentLike.create({
        data: {
          commentId: id,
          userId: userId,
          userRole: userRole,
        }
      });

      // Update comment likes count
      await prisma.comment.update({
        where: { id: id },
        data: {
          likesCount: {
            increment: 1
          }
        }
      });

      return NextResponse.json({ 
        message: 'Comment liked successfully',
        isLiked: true 
      });
    }
  } catch (error) {
    console.error('Error toggling comment like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle comment like' },
      { status: 500 }
    );
  }
}

