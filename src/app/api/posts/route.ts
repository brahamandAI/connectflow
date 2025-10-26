import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { mockPosts } from '@/lib/mock-data';

// GET /api/posts - Fetch feed posts with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Get current user from session if available
    const session = await getServerSession(authOptions);
    const currentUserId = (session?.user as any)?.id;

    // Try to use database, fallback to mock data if not available
    try {
      if (prisma && prisma.post) {
        const posts = await prisma.post.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            content: true,
            imageUrl: true,
            postType: true,
            authorId: true,
            authorRole: true,
            location: true,
            eventTitle: true,
            eventDate: true,
            eventLocation: true,
            createdAt: true,
            updatedAt: true,
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
              take: 3,
              orderBy: { createdAt: 'desc' },
              include: {
                author: {
                  select: {
                    id: true,
                    fullName: true,
                    profileImage: true,
                  }
                },
                _count: {
                  select: {
                    likes: true,
                    replies: true,
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

        const totalPosts = await prisma.post.count();

        // Transform posts to match expected format
        const transformedPosts = posts.map(post => {
          const isLikedByUser = currentUserId ? post.likes.some(like => like.userId === currentUserId) : false;
          
          return {
            id: post.id,
            content: post.content,
            imageUrl: post.imageUrl,
            postType: post.postType,
            likesCount: post._count.likes,
            commentsCount: post._count.comments,
            sharesCount: post._count.shares,
            isLikedByUser,
            location: post.location,
            event: post.eventTitle ? {
              title: post.eventTitle,
              date: post.eventDate?.toISOString().split('T')[0] || null,
              time: post.eventDate?.toTimeString().split(' ')[0] || null,
              location: post.eventLocation
            } : null,
            likes: post.likes.map(like => ({
              id: like.id,
              userId: like.userId,
              userRole: like.userRole,
              user: like.user,
              createdAt: like.createdAt.toISOString()
            })),
            comments: post.comments.map(comment => ({
              id: comment.id,
              content: comment.content,
              authorId: comment.authorId,
              authorRole: comment.authorRole,
              parentCommentId: comment.parentCommentId,
              likesCount: comment._count?.likes || 0,
              repliesCount: comment._count?.replies || 0,
              createdAt: comment.createdAt.toISOString(),
              author: comment.author
            })),
            createdAt: post.createdAt.toISOString(),
            author: post.author || {
              id: post.authorId,
              fullName: 'Unknown User',
              profileImage: null,
              headline: 'User',
              role: post.authorRole,
              companyName: undefined
            }
          };
        });

        return NextResponse.json({
          posts: transformedPosts,
          pagination: {
            page,
            limit,
            total: totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            hasNext: page * limit < totalPosts,
            hasPrev: page > 1,
          }
        });
      } else {
        throw new Error('Prisma not available');
      }
    } catch (dbError) {
      // Fallback to mock data
      console.log('Database not available, using mock data:', dbError instanceof Error ? dbError.message : 'Unknown error');
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      return NextResponse.json({
        posts: mockPosts.slice(startIndex, endIndex),
        pagination: {
          page,
          limit,
          total: mockPosts.length,
          totalPages: Math.ceil(mockPosts.length / limit),
          hasNext: endIndex < mockPosts.length,
          hasPrev: page > 1,
        }
      });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    // Check authentication first
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in to create posts' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content, imageUrl, postType = 'general', location, event } = body;

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Post content is required' },
        { status: 400 }
      );
    }

    // Get user information from session
    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;
    const userEmail = session.user.email;
    const userName = session.user.name;

    if (!userId || !userRole) {
      return NextResponse.json(
        { error: 'User information not found in session' },
        { status: 400 }
      );
    }

    console.log('Creating post for authenticated user:', { userId, userRole, userEmail });
    console.log('Post data received:', { content, imageUrl, postType, location, event });

    try {
      // First, ensure the user exists in the unified User table
      let user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        // Create the user in the unified User table
        console.log('Creating user in unified User table:', { userId, userName, userEmail, userRole });
        try {
          user = await prisma.user.create({
            data: {
              id: userId, // Use the existing user ID from session
              email: userEmail || `${userId}@example.com`,
              fullName: userName || 'User',
              headline: userRole === 'recruiter' ? 'HR Professional' : 'Software Engineer',
              role: userRole,
              companyName: userRole === 'recruiter' ? 'Company' : undefined,
              profileImage: null,
            }
          });
          console.log('User created in unified table:', user);
        } catch (userError) {
          console.error('Error creating user in unified table:', userError);
          throw userError;
        }
      } else {
        console.log('User found in unified table:', user.id);
      }
      
      // Create the post
      const postData = {
        content: content.trim(),
        imageUrl: imageUrl || null,
        postType,
        authorId: userId, // Use the authenticated user's ID
        authorRole: userRole,
        location: location || null,
        eventTitle: event?.title || null,
        eventDate: event ? new Date(`${event.date}T${event.time}`) : null,
        eventLocation: event?.location || null,
      };
      
      console.log('Creating post with data:', postData);
      
      const post = await prisma.post.create({
        data: postData,
        select: {
          id: true,
          content: true,
          imageUrl: true,
          postType: true,
          authorId: true,
          authorRole: true,
          location: true,
          eventTitle: true,
          eventDate: true,
          eventLocation: true,
          createdAt: true,
          updatedAt: true,
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
              comments: true,
              shares: true,
            }
          }
        }
      });
      
      console.log('Post created successfully:', {
        id: post.id,
        content: post.content,
        authorId: post.authorId,
        imageUrl: post.imageUrl
      });

      // Transform the created post to match expected format
      const transformedPost = {
        id: post.id,
        content: post.content,
        imageUrl: post.imageUrl,
        postType: post.postType,
        likesCount: post._count.likes,
        commentsCount: post._count.comments,
        sharesCount: post._count.shares,
        isLikedByUser: false,
        location: post.location,
        event: post.eventTitle ? {
          title: post.eventTitle,
          date: post.eventDate?.toISOString().split('T')[0] || null,
          time: post.eventDate?.toTimeString().split(' ')[0] || null,
          location: post.eventLocation
        } : null,
        createdAt: post.createdAt.toISOString(),
        author: post.author
      };

      return NextResponse.json({
        message: 'Post created successfully',
        post: transformedPost
      }, { status: 201 });
    } catch (dbError) {
      console.error('Database error creating post:', dbError);
      console.error('Error details:', {
        message: dbError instanceof Error ? dbError.message : 'Unknown error',
        code: (dbError as any)?.code,
        meta: (dbError as any)?.meta,
        stack: dbError instanceof Error ? dbError.stack : undefined
      });
      
      // Return error instead of mock data
      return NextResponse.json({
        error: 'Failed to save post to database',
        details: dbError instanceof Error ? dbError.message : 'Unknown error',
        debug: {
          code: (dbError as any)?.code,
          meta: (dbError as any)?.meta
        }
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

