import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST /api/posts/[id]/like - Like or unlike a post
export async function POST(
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

    const { id } = await params;
    const userId = (session.user as any).id;
    const userRole = (session.user as any).role || 'jobseeker';

    // Check if database is available
    if (!prisma || !prisma.like) {
      return NextResponse.json({ 
        message: 'Database not available, like not persisted',
        isLiked: true 
      });
    }

    // Check if user already liked this post
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId: userId,
        }
      }
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: { id: existingLike.id }
      });

      // Update post likes count
      await prisma.post.update({
        where: { id: id },
        data: {
          likesCount: {
            decrement: 1
          }
        }
      });

      return NextResponse.json({ 
        message: 'Post unliked successfully',
        isLiked: false 
      });
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          postId: id,
          userId: userId,
          userRole: userRole,
        }
      });

      // Update post likes count
      await prisma.post.update({
        where: { id: id },
        data: {
          likesCount: {
            increment: 1
          }
        }
      });

      return NextResponse.json({ 
        message: 'Post liked successfully',
        isLiked: true 
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}

