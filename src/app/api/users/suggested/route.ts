import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockUsers } from '@/lib/mock-data';

// GET /api/users/suggested - Get suggested users to connect with
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    const excludeUserId = searchParams.get('excludeUserId');

    // Try to use database, fallback to mock data if not available
    try {
      if (prisma && prisma.user) {
        // Get users excluding the current user
        const whereClause = excludeUserId ? { id: { not: excludeUserId } } : {};

        const users = await prisma.user.findMany({
          where: whereClause,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            fullName: true,
            profileImage: true,
            headline: true,
            role: true,
            companyName: true,
            location: true,
          }
        });

        return NextResponse.json({ users });
      } else {
        throw new Error('Prisma not available');
      }
    } catch (dbError) {
      // Fallback to mock data
      console.log('Database not available, using mock data:', dbError instanceof Error ? dbError.message : 'Unknown error');
      
      let users = mockUsers;
      if (excludeUserId) {
        users = mockUsers.filter(user => user.id !== excludeUserId);
      }
      
      return NextResponse.json({
        users: users.slice(0, limit)
      });
    }
  } catch (error) {
    console.error('Error fetching suggested users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suggested users' },
      { status: 500 }
    );
  }
}

