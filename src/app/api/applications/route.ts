import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      jobId,
      jobSeekerId,
      recruiterId,
      resumeUrl,
      coverLetter,
      expectedSalary,
      noticePeriod,
      availabilityDate,
      portfolioUrl,
      linkedinUrl,
      githubUrl,
      additionalNotes,
    } = body;

    // Validate required fields
    if (!jobId || !jobSeekerId || !recruiterId || !coverLetter) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Check if job seeker exists
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { id: jobSeekerId },
    });

    if (!jobSeeker) {
      return NextResponse.json(
        { error: "Job seeker not found" },
        { status: 404 }
      );
    }

    // Check if recruiter exists - handle both unified User ID and legacy Recruiter ID
    let recruiter = null;
    let actualRecruiterId = recruiterId;
    
    // First, check if this is a unified User ID
    const user = await prisma.user.findUnique({
      where: { id: recruiterId },
      select: { id: true, email: true, role: true }
    });
    
    if (user && user.role === "recruiter") {
      // Find the corresponding recruiter record
      recruiter = await prisma.recruiter.findUnique({
        where: { email: user.email },
      });
      if (recruiter) {
        actualRecruiterId = recruiter.id;
      }
    } else {
      // Assume it's a legacy recruiter ID
      recruiter = await prisma.recruiter.findUnique({
        where: { id: recruiterId },
      });
    }

    if (!recruiter) {
      return NextResponse.json(
        { error: "Recruiter not found" },
        { status: 404 }
      );
    }

    // Check if application already exists
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId: jobId,
        jobSeekerId: jobSeekerId,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create the application
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        jobSeekerId,
        recruiterId: actualRecruiterId,
        resumeUrl: resumeUrl || null,
        coverLetter,
        expectedSalary: expectedSalary || null,
        noticePeriod: noticePeriod || null,
        availabilityDate: availabilityDate || null,
        portfolioUrl: portfolioUrl || null,
        linkedinUrl: linkedinUrl || null,
        githubUrl: githubUrl || null,
        additionalNotes: additionalNotes || null,
        status: "Applied",
      },
      include: {
        job: {
          select: {
            title: true,
            company: true,
          },
        },
        jobSeeker: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });

    // Update job applicants count
    await prisma.job.update({
      where: { id: jobId },
      data: {
        applicantsCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: "Application submitted successfully",
      application: {
        id: application.id,
        jobTitle: application.job.title,
        company: application.job.company,
        applicantName: application.jobSeeker.fullName,
        status: application.status,
        appliedDate: application.appliedDate,
      },
    });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");
    const jobSeekerId = searchParams.get("jobSeekerId");
    const recruiterId = searchParams.get("recruiterId");
    const status = searchParams.get("status");

    // Build where clause
    const where: any = {};
    if (jobId) where.jobId = jobId;
    if (jobSeekerId) where.jobSeekerId = jobSeekerId;
    if (recruiterId) {
      // Handle both unified User ID and legacy Recruiter ID
      // First, check if this is a unified User ID and get the corresponding Recruiter ID
      const user = await prisma.user.findUnique({
        where: { id: recruiterId },
        select: { id: true, email: true, role: true }
      });
      
      if (user && user.role === "recruiter") {
        // Find the corresponding recruiter record
        const recruiter = await prisma.recruiter.findUnique({
          where: { email: user.email },
          select: { id: true }
        });
        
        if (recruiter) {
          where.recruiterId = recruiter.id;
        } else {
          // If no recruiter record found, return empty results
          return NextResponse.json([]);
        }
      } else {
        // Assume it's a legacy recruiter ID
        where.recruiterId = recruiterId;
      }
    }
    if (status) where.status = status;

    const applications = await prisma.jobApplication.findMany({
      where,
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
        appliedDate: "desc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
} 