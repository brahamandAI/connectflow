import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/test-prisma - Test Prisma connection
export async function GET() {
  try {
    // Test basic connection
    await prisma.$connect();
    
    // Test if we can query the database
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      success: true,
      message: 'Prisma connection successful',
      userCount,
      prismaAvailable: !!prisma
    });
  } catch (error) {
    console.error('Prisma connection test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      prismaAvailable: !!prisma
    }, { status: 500 });
  }
}