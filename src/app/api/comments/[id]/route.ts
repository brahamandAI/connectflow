import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// DELETE /api/comments/[id] - Delete a comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get current user from session
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id: commentId } = await params;
    const userId = (session.user as any).id;

    // Check if database is available
    if (!prisma || !prisma.comment) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      );
    }

    // Find the comment to verify ownership and get post info
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        post: {
          select: { id: true }
        }
      }
    });

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    // Check if user is the author of the comment
    if (comment.authorId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized - You can only delete your own comments' },
        { status: 403 }
      );
    }

    // Delete the comment (this will cascade delete replies and likes)
    await prisma.comment.delete({
      where: { id: commentId }
    });

    // Update post comments count
    await prisma.post.update({
      where: { id: comment.postId },
      data: {
        commentsCount: {
          decrement: 1
        }
      }
    });

    // If this was a reply, update parent comment replies count
    if (comment.parentCommentId) {
      await prisma.comment.update({
        where: { id: comment.parentCommentId },
        data: {
          repliesCount: {
            decrement: 1
          }
        }
      });
    }

    return NextResponse.json({ 
      message: 'Comment deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
