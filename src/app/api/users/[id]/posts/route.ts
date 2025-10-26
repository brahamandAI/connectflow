import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/users/[id]/posts - Get all posts by a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Get current user from session if available
    const session = await getServerSession(authOptions);
    const currentUserId = (session?.user as any)?.id;

    // Get posts by the specified user
    const posts = await prisma.post.findMany({
      where: {
        authorId: id
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            headline: true,
            role: true,
            companyName: true,
            profileImage: true,
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            shares: true,
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
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform posts to match frontend expectations
    const transformedPosts = posts.map(post => ({
      id: post.id,
      content: post.content,
      imageUrl: post.imageUrl,
      postType: post.postType,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      sharesCount: post._count.shares,
      isLikedByUser: currentUserId ? (post.likes && post.likes.length > 0) : false,
      likes: post.likes?.map(like => ({
        id: like.id,
        userId: like.userId,
        userRole: like.userRole,
        user: like.user,
        createdAt: like.createdAt.toISOString()
      })) || [],
      createdAt: post.createdAt.toISOString(),
      author: post.author || {
        id: post.authorId,
        fullName: 'Unknown User',
        profileImage: null,
        headline: 'Unknown',
        role: 'jobseeker',
        companyName: null,
      },
    }));

    return NextResponse.json({
      posts: transformedPosts,
      total: transformedPosts.length
    });

  } catch (error) {
    console.error('Error fetching user posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user posts' },
      { status: 500 }
    );
  }
}
