import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find job seeker by email
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { email },
    });

    if (!jobSeeker) {
      return NextResponse.json(
        { error: "Job seeker not found" },
        { status: 404 }
      );
    }

    // Get applications for this job seeker
    const applications = await prisma.jobApplication.findMany({
      where: {
        jobSeekerId: jobSeeker.id,
      },
      include: {
        job: {
          select: {
            title: true,
            company: true,
            location: true,
            employmentType: true,
            salaryMin: true,
            salaryMax: true,
            salaryCurrency: true,
            salaryPeriod: true,
          },
        },
      },
      orderBy: {
        appliedDate: "desc",
      },
    });

    // Format applications for frontend
    const formattedApplications = applications.map((app: any) => ({
      id: app.id,
      position: app.job.title,
      company: app.job.company,
      location: app.job.location,
      employmentType: app.job.employmentType,
      salary: app.job.salaryMin && app.job.salaryMax 
        ? `₹${app.job.salaryMin.toLocaleString('en-IN')} - ₹${app.job.salaryMax.toLocaleString('en-IN')}`
        : "Not specified",
      status: app.status,
      date: app.appliedDate,
      reviewedDate: app.reviewedDate,
      notes: app.notes,
    }));

    return NextResponse.json(formattedApplications);
  } catch (error) {
    console.error("Error fetching job seeker applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
} 