import { NextResponse } from 'next/server';
import { seedFeedData, seedJobsData } from '@/lib/seed-data';

// POST /api/seed - Seed the database with sample data
export async function POST() {
  try {
    const feedData = await seedFeedData();
    const jobsData = await seedJobsData();
    
    return NextResponse.json({ 
      message: 'Database seeded successfully',
      data: {
        feed: feedData,
        jobs: jobsData
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
