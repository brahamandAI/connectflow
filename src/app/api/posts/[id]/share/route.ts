import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/posts/[id]/share - Share a post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, userRole, sharedContent } = body;

    if (!userId || !userRole) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, userRole' },
        { status: 400 }
      );
    }

    // Create the share record
    const share = await prisma.share.create({
      data: {
        postId: id,
        userId: userId,
        userRole: userRole,
        sharedContent,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            profileImage: true,
          }
        }
      }
    });

    // Update post shares count
    await prisma.post.update({
      where: { id: id },
      data: {
        sharesCount: {
          increment: 1
        }
      }
    });

    return NextResponse.json(share, { status: 201 });
  } catch (error) {
    console.error('Error sharing post:', error);
    return NextResponse.json(
      { error: 'Failed to share post' },
      { status: 500 }
    );
  }
}

