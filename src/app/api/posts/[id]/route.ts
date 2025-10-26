import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// DELETE /api/posts/[id] - Delete a post (only by the author)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in to delete posts' },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    console.log('🗑️ Delete post attempt:', { postId, userId });

    try {
      // First, find the post and verify ownership
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
          id: true,
          authorId: true,
          content: true,
          imageUrl: true,
          author: {
            select: {
              fullName: true,
            }
          }
        }
      });

      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }

      // Check if the current user is the author
      if (post.authorId !== userId) {
        console.log('❌ Unauthorized delete attempt:', {
          postAuthor: post.authorId,
          currentUser: userId,
          postId
        });
        return NextResponse.json(
          { error: 'Unauthorized - You can only delete your own posts' },
          { status: 403 }
        );
      }

      console.log('✅ Authorized delete for post:', {
        postId,
        author: post.author.fullName,
        content: post.content.substring(0, 50) + '...'
      });

      // Delete the post (this will cascade delete likes, comments, shares due to schema)
      await prisma.post.delete({
        where: { id: postId }
      });

      console.log('✅ Post deleted successfully:', postId);

      return NextResponse.json({
        message: 'Post deleted successfully',
        postId: postId
      });

    } catch (dbError) {
      console.error('❌ Database error deleting post:', dbError);
      return NextResponse.json({
        error: 'Failed to delete post',
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

// GET /api/posts/[id] - Get a specific post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            profileImage: true,
            headline: true,
            role: true,
            companyName: true,
          }
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                profileImage: true,
              }
            }
          }
        },
        comments: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: {
                id: true,
                fullName: true,
                profileImage: true,
              }
            }
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            shares: true,
          }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Transform the post to match expected format
    const transformedPost = {
      id: post.id,
      content: post.content,
      imageUrl: post.imageUrl,
      postType: post.postType,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      sharesCount: post._count.shares,
      isLikedByUser: false, // This would need to be calculated based on current user
      createdAt: post.createdAt.toISOString(),
      author: post.author || {
        id: post.authorId,
        fullName: 'Unknown User',
        profileImage: null,
        headline: 'User',
        role: 'jobseeker',
        companyName: undefined
      }
    };

    return NextResponse.json({ post: transformedPost });

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}