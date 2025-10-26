import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get recruiter ID from Recruiter table using email
    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    // Check if recruiter exists in legacy Recruiter table
    let recruiter = await prisma.recruiter.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        fullName: true,
        companyName: true,
        email: true
      }
    });

    // If not found, create recruiter profile from unified User data
    if (!recruiter) {
      console.log('Recruiter not found in legacy table, checking unified User table...');
      const unifiedUser = await prisma.user.findUnique({
        where: { email: userEmail },
        select: {
          id: true,
          fullName: true,
          companyName: true,
          email: true
        }
      });

      if (!unifiedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Create recruiter profile in legacy table for backward compatibility
      recruiter = await prisma.recruiter.create({
        data: {
          email: unifiedUser.email,
          fullName: unifiedUser.fullName,
          companyName: unifiedUser.companyName || "Not Specified",
          profileComplete: false,
          emailVerified: false,
          phoneVerified: false
        },
        select: {
          id: true,
          fullName: true,
          companyName: true,
          email: true
        }
      });
      console.log('Created recruiter profile:', recruiter.id);
    }

    const recruiterId = recruiter.id;

    // Fetch recruiter's job postings
    const jobs = await prisma.job.findMany({
      where: { postedBy: recruiterId },
      orderBy: { postedDate: 'desc' }
    });

    // Fetch applications for all jobs
    const applications = await prisma.jobApplication.findMany({
      where: { recruiterId: recruiterId },
      include: {
        job: {
          select: {
            title: true,
            company: true,
            location: true,
            employmentType: true,
          },
        },
        jobSeeker: {
          select: {
            fullName: true,
            email: true,
            currentJobTitle: true,
            yearsOfExperience: true,
            education: true,
            skills: true,
            city: true,
            country: true,
          },
        },
      },
      orderBy: {
        appliedDate: 'desc',
      },
    });

    // Calculate stats
    const activeListings = jobs.length;
    const totalApplicants = applications.length;
    const pendingReviews = applications.filter((app: any) => app.status === "Applied").length;

    // Format job postings for display
    const jobPostings = jobs.map((job: any) => ({
      id: job.id,
      title: job.title,
      postedDate: job.postedDate.toISOString(),
      applicantsCount: applications.filter((app: any) => app.jobId === job.id).length
    }));

    // Get recent activities (applications)
    const activities = applications.slice(0, 5).map((app: any) => ({
      id: app.id,
      action: `${app.jobSeeker.fullName} applied for ${app.job.title}`,
      time: app.appliedDate.toISOString(),
      user: app.jobSeeker.fullName
    }));

    return NextResponse.json({
      stats: {
        activeListings,
        totalApplicants,
        pendingReviews,
        messages: 0 // TODO: Implement messaging system
      },
      jobPostings,
      activities,
      user: recruiter
    });

  } catch (error) {
    console.error("Recruiter Dashboard API - error:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    console.error("Stack:", error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json({ 
      error: "Failed to fetch dashboard data",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}