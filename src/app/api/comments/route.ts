import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/comments - Get comments for a specific post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    if (!postId) {
      return NextResponse.json(
        { error: 'postId is required' },
        { status: 400 }
      );
    }

    // Check if database is available
    if (!prisma || !prisma.comment) {
      return NextResponse.json({
        comments: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        }
      });
    }

    const comments = await prisma.comment.findMany({
      where: { 
        postId: postId
        // Note: All comments are top-level for now, no replies implemented yet
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
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
        replies: {
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
            }
          }
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          }
        }
      }
    });

    const totalComments = await prisma.comment.count({
      where: { 
        postId: postId
      }
    });

    return NextResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total: totalComments,
        totalPages: Math.ceil(totalComments / limit),
        hasNext: page * limit < totalComments,
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST /api/comments - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, postId, authorId, authorRole, parentCommentId } = body;

    if (!content || !postId || !authorId || !authorRole) {
      return NextResponse.json(
        { error: 'Missing required fields: content, postId, authorId, authorRole' },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
        authorRole,
        parentCommentId,
      },
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
        _count: {
          select: {
            likes: true,
            replies: true,
          }
        }
      }
    });

    // Update post comments count
    await prisma.post.update({
      where: { id: postId },
      data: {
        commentsCount: {
          increment: 1
        }
      }
    });

    // If this is a reply, update parent comment replies count
    if (parentCommentId) {
      await prisma.comment.update({
        where: { id: parentCommentId },
        data: {
          repliesCount: {
            increment: 1
          }
        }
      });
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

