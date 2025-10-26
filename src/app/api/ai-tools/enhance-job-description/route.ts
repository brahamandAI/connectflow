import { NextRequest, NextResponse } from 'next/server';
import { enhanceJobDescription } from '@/lib/ai-utils';

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    if (description.trim().length < 50) {
      return NextResponse.json(
        { error: 'Job description must be at least 50 characters long' },
        { status: 400 }
      );
    }

    if (description.length > 10000) {
      return NextResponse.json(
        { error: 'Job description must be less than 10,000 characters' },
        { status: 400 }
      );
    }

    // Enhance the job description using AI
    const result = await enhanceJobDescription(description);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in enhance-job-description API:', error);
    return NextResponse.json(
      { error: 'Failed to enhance job description' },
      { status: 500 }
    );
  }
}
