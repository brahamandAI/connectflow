import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/messages/search-users - Search for users to message
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = (session.user as any).id;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query.trim()) {
      return NextResponse.json({ users: [] });
    }

    // Get current user's existing conversations to exclude them
    const existingConversations = await prisma.conversation.findMany({
      where: {
        participants: {
          has: currentUserId
        }
      },
      select: {
        participants: true
      }
    });

    const existingUserIds = new Set([
      currentUserId,
      ...existingConversations.flatMap(conv => 
        conv.participants.filter(id => id !== currentUserId)
      )
    ]);

    // Search in both JobSeeker and Recruiter tables
    const [jobSeekers, recruiters] = await Promise.all([
      prisma.jobSeeker.findMany({
        where: {
          id: { notIn: Array.from(existingUserIds) },
          isActive: true,
          OR: [
            { fullName: { contains: query, mode: 'insensitive' } },
            { currentJobTitle: { contains: query, mode: 'insensitive' } },
            { city: { contains: query, mode: 'insensitive' } },
            { state: { contains: query, mode: 'insensitive' } },
            { skills: { hasSome: [query] } }
          ]
        },
        select: {
          id: true,
          fullName: true,
          currentJobTitle: true,
          city: true,
          state: true,
          country: true,
          skills: true
        },
        take: Math.ceil(limit / 2)
      }),
      prisma.recruiter.findMany({
        where: {
          id: { notIn: Array.from(existingUserIds) },
          isActive: true,
          OR: [
            { fullName: { contains: query, mode: 'insensitive' } },
            { companyName: { contains: query, mode: 'insensitive' } },
            { position: { contains: query, mode: 'insensitive' } },
            { city: { contains: query, mode: 'insensitive' } },
            { state: { contains: query, mode: 'insensitive' } },
            { industry: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          fullName: true,
          companyName: true,
          position: true,
          city: true,
          state: true,
          country: true,
          industry: true
        },
        take: Math.ceil(limit / 2)
      })
    ]);

    // Format and combine results
    const users = [
      ...jobSeekers.map(user => ({
        id: user.id,
        fullName: user.fullName,
        profileImage: null,
        headline: user.currentJobTitle || 'Job Seeker',
        role: 'jobseeker',
        companyName: null,
        location: [user.city, user.state, user.country].filter(Boolean).join(', '),
        skills: user.skills,
        type: 'jobseeker'
      })),
      ...recruiters.map(user => ({
        id: user.id,
        fullName: user.fullName,
        profileImage: null,
        headline: user.position || 'Recruiter',
        role: 'recruiter',
        companyName: user.companyName,
        location: [user.city, user.state, user.country].filter(Boolean).join(', '),
        industry: user.industry,
        type: 'recruiter'
      }))
    ];

    // Sort by relevance (exact matches first, then partial matches)
    const sortedUsers = users.sort((a, b) => {
      const aExactMatch = a.fullName.toLowerCase() === query.toLowerCase();
      const bExactMatch = b.fullName.toLowerCase() === query.toLowerCase();
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      return a.fullName.localeCompare(b.fullName);
    });

    return NextResponse.json({
      users: sortedUsers.slice(0, limit)
    });
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 }
    );
  }
}
