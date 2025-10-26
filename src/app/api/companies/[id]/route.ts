import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Recruiter } from '../../../../generated/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recruiter = await prisma.recruiter.findUnique({
      where: {
        id,
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
        website: true,
        companySize: true,
        companyBenefits: true,
        hiringNeeds: true,
        preferredLocations: true,
        bio: true,
        linkedinUrl: true,
        fullName: true,
        email: true,
        phone: true,
        position: true
      }
    });

    if (!recruiter) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    const companyDetails = {
      id: recruiter.id,
      name: recruiter.companyName,
      logo: recruiter.companyLogo,
      industry: recruiter.industry || 'Not specified',
      location: `${recruiter.city || ''}${recruiter.state ? `, ${recruiter.state}` : ''}${recruiter.country ? `, ${recruiter.country}` : ''}`.trim() || 'Location not specified',
      description: recruiter.companyDescription || 'No description available',
      website: recruiter.website,
      companySize: recruiter.companySize,
      companyBenefits: recruiter.companyBenefits || [],
      hiringNeeds: recruiter.hiringNeeds || [],
      preferredLocations: recruiter.preferredLocations || [],
      bio: recruiter.bio,
      linkedinUrl: recruiter.linkedinUrl,
      recruiter: {
        name: recruiter.fullName,
        email: recruiter.email,
        phone: recruiter.phone,
        position: recruiter.position
      }
    };

    return NextResponse.json(companyDetails);
  } catch (error) {
    console.error('Error fetching company details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company details' },
      { status: 500 }
    );
  }
} 