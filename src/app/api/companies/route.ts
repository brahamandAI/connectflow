import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Recruiter } from '../../../generated/prisma';

export async function GET() {
  try {
    const recruiters = await prisma.recruiter.findMany({
      where: {
        isActive: true,
        profileComplete: true
      },
      select: {
        id: true,
        companyName: true,
        companyLogo: true,
        industry: true,
        city: true,
        state: true,
        country: true,
        companyDescription: true,
        website: true
      }
    });

    const formattedCompanies = recruiters.map((recruiter: Partial<Recruiter>) => ({
      id: recruiter.id,
      name: recruiter.companyName,
      logo: recruiter.companyLogo,
      industry: recruiter.industry || 'Not specified',
      location: `${recruiter.city || ''}${recruiter.state ? `, ${recruiter.state}` : ''}${recruiter.country ? `, ${recruiter.country}` : ''}`.trim() || 'Location not specified',
      description: recruiter.companyDescription || 'No description available',
      website: recruiter.website
    }));

    return NextResponse.json(formattedCompanies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
} 