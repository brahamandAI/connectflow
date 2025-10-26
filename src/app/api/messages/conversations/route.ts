import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/messages/conversations - Get user's conversations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = (session.user as any).id;
    
    if (!currentUserId) {
      return NextResponse.json({ error: 'Invalid user session' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;

    // Get conversations where current user is a participant
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          has: currentUserId
        }
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                fullName: true,
                profileImage: true
              }
            }
          }
        }
      },
      orderBy: { lastMessageAt: 'desc' },
      skip,
      take: limit
    });

    // Get participant details for each conversation
    const conversationsWithParticipants = await Promise.all(
      conversations.map(async (conversation) => {
        const participantIds = conversation.participants.filter(id => id !== currentUserId);
        
        // Get participants from both JobSeeker and Recruiter tables
        const [jobSeekerParticipants, recruiterParticipants] = await Promise.all([
          prisma.jobSeeker.findMany({
            where: { id: { in: participantIds } },
            select: {
              id: true,
              fullName: true,
              currentJobTitle: true
            }
          }),
          prisma.recruiter.findMany({
            where: { id: { in: participantIds } },
            select: {
              id: true,
              fullName: true,
              position: true,
              companyName: true
            }
          })
        ]);

        // Combine and format participants
        const participants = [
          ...jobSeekerParticipants.map(user => ({
            id: user.id,
            fullName: user.fullName,
            profileImage: null,
            headline: user.currentJobTitle || 'Job Seeker',
            role: 'jobseeker',
            companyName: null
          })),
          ...recruiterParticipants.map(user => ({
            id: user.id,
            fullName: user.fullName,
            profileImage: null,
            headline: user.position || 'Recruiter',
            role: 'recruiter',
            companyName: user.companyName
          }))
        ];

        // Count unread messages
        const unreadCount = await prisma.message.count({
          where: {
            conversationId: conversation.id,
            senderId: { not: currentUserId },
            isRead: false
          }
        });

        // Only return conversation if we found participants
        if (participants.length === 0) {
          console.warn(`Conversation ${conversation.id} has no valid participants`);
        }

        return {
          id: conversation.id,
          participants,
          lastMessage: conversation.messages[0] || null,
          lastMessageAt: conversation.lastMessageAt,
          unreadCount,
          createdAt: conversation.createdAt
        };
      })
    );

    // Filter out conversations without participants
    const validConversations = conversationsWithParticipants.filter(
      conv => conv.participants.length > 0
    );

    const total = await prisma.conversation.count({
      where: {
        participants: {
          has: currentUserId
        }
      }
    });

    console.log(`Fetched ${validConversations.length} valid conversations (${conversationsWithParticipants.length} total) for user ${currentUserId}`);
    
    return NextResponse.json({
      conversations: validConversations,
      pagination: {
        page,
        limit,
        total: validConversations.length,
        hasNext: skip + limit < validConversations.length
      }
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to fetch conversations', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/messages/conversations - Start a new conversation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = (session.user as any).id;
    const body = await request.json();
    const { participantId, initialMessage } = body;

    if (!participantId) {
      return NextResponse.json(
        { error: 'Missing required field: participantId' },
        { status: 400 }
      );
    }

    if (participantId === currentUserId) {
      return NextResponse.json(
        { error: 'Cannot start conversation with yourself' },
        { status: 400 }
      );
    }

    // Check if conversation already exists
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          hasEvery: [currentUserId, participantId]
        }
      }
    });

    if (existingConversation) {
      return NextResponse.json({
        conversation: existingConversation,
        message: 'Conversation already exists'
      });
    }

    // Create new conversation
    const conversation = await prisma.conversation.create({
      data: {
        participants: [currentUserId, participantId]
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                fullName: true,
                profileImage: true
              }
            }
          }
        }
      }
    });

    // Send initial message if provided
    if (initialMessage) {
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          senderId: currentUserId,
          content: initialMessage,
          messageType: 'text'
        }
      });

      // Update conversation's last message time
      await prisma.conversation.update({
        where: { id: conversation.id },
        data: { lastMessageAt: new Date() }
      });
    }

    // Get participant details from JobSeeker or Recruiter table
    const [jobSeeker, recruiter] = await Promise.all([
      prisma.jobSeeker.findUnique({
        where: { id: participantId },
        select: {
          id: true,
          fullName: true,
          currentJobTitle: true
        }
      }),
      prisma.recruiter.findUnique({
        where: { id: participantId },
        select: {
          id: true,
          fullName: true,
          position: true,
          companyName: true
        }
      })
    ]);

    if (!jobSeeker && !recruiter) {
      return NextResponse.json(
        { error: 'Participant not found' },
        { status: 404 }
      );
    }

    const participant = jobSeeker ? {
      id: jobSeeker.id,
      fullName: jobSeeker.fullName,
      profileImage: null,
      headline: jobSeeker.currentJobTitle || 'Job Seeker',
      role: 'jobseeker',
      companyName: null
    } : {
      id: recruiter!.id,
      fullName: recruiter!.fullName,
      profileImage: null,
      headline: recruiter!.position || 'Recruiter',
      role: 'recruiter',
      companyName: recruiter!.companyName
    };

    // Get current user details for the participants array
    const [currentUserJobSeeker, currentUserRecruiter] = await Promise.all([
      prisma.jobSeeker.findUnique({
        where: { id: currentUserId },
        select: {
          id: true,
          fullName: true,
          currentJobTitle: true
        }
      }),
      prisma.recruiter.findUnique({
        where: { id: currentUserId },
        select: {
          id: true,
          fullName: true,
          position: true,
          companyName: true
        }
      })
    ]);

    const currentUser = currentUserJobSeeker ? {
      id: currentUserJobSeeker.id,
      fullName: currentUserJobSeeker.fullName,
      profileImage: null,
      headline: currentUserJobSeeker.currentJobTitle || 'Job Seeker',
      role: 'jobseeker',
      companyName: null
    } : {
      id: currentUserRecruiter!.id,
      fullName: currentUserRecruiter!.fullName,
      profileImage: null,
      headline: currentUserRecruiter!.position || 'Recruiter',
      role: 'recruiter',
      companyName: currentUserRecruiter!.companyName
    };

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        participants: [currentUser, participant],
        lastMessage: conversation.messages[0] || null,
        lastMessageAt: conversation.lastMessageAt,
        unreadCount: 0,
        createdAt: conversation.createdAt
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}


