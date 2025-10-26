import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Test database connection and data availability
    const jobCount = await prisma.job.count();
    const userCount = await prisma.jobSeeker.count();
    
    // Get a sample job
    const sampleJob = await prisma.job.findFirst({
      include: {
        recruiter: {
          select: {
            companyName: true,
            companyDescription: true,
            companyBenefits: true
          }
        }
      }
    });

    // Get a sample user
    const sampleUser = await prisma.jobSeeker.findFirst({
      select: {
        id: true,
        fullName: true,
        skills: true,
        city: true,
        state: true,
        country: true
      }
    });

    return NextResponse.json({
      status: 'OK',
      database: {
        connected: true,
        jobCount,
        userCount
      },
      sampleData: {
        job: sampleJob ? {
          id: sampleJob.id,
          title: sampleJob.title,
          company: sampleJob.company,
          hasRecruiter: !!sampleJob.recruiter
        } : null,
        user: sampleUser ? {
          id: sampleUser.id,
          name: sampleUser.fullName,
          hasSkills: sampleUser.skills && sampleUser.skills.length > 0,
          skillsCount: sampleUser.skills?.length || 0,
          location: `${sampleUser.city}, ${sampleUser.state}, ${sampleUser.country}`
        } : null
      },
      environment: {
        hasOpenAIKey: !!process.env.OPENAI_API_KEY,
        nodeEnv: process.env.NODE_ENV
      }
    });

  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      database: {
        connected: false
      }
    }, { status: 500 });
  }
}
