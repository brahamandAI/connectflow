import { NextRequest, NextResponse } from 'next/server';
import { analyzeCareerPath } from '@/lib/ai-utils';

export async function POST(request: NextRequest) {
  try {
    const { currentRole, experience, skills, goals } = await request.json();

    if (!currentRole || !experience || !skills) {
      return NextResponse.json(
        { error: 'Current role, experience, and skills are required' },
        { status: 400 }
      );
    }

    if (currentRole.trim().length < 2) {
      return NextResponse.json(
        { error: 'Current role must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (skills.trim().length < 10) {
      return NextResponse.json(
        { error: 'Skills description must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Analyze career path using AI
    const result = await analyzeCareerPath(currentRole, experience, skills, goals || "");

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in career-path-analysis API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze career path' },
      { status: 500 }
    );
  }
}
