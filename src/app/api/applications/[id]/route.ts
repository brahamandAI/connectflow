import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const application = await prisma.jobApplication.findUnique({
      where: { id },
      include: {
        job: {
          select: {
            title: true,
            company: true,
            location: true,
            employmentType: true,
            experienceLevel: true,
            description: true,
            requirements: true,
            responsibilities: true,
            benefits: true,
            salaryMin: true,
            salaryMax: true,
            salaryCurrency: true,
            salaryPeriod: true,
            applicationDeadline: true,
          },
        },
        jobSeeker: {
          select: {
            fullName: true,
            email: true,
            phone: true,
            currentJobTitle: true,
            yearsOfExperience: true,
            education: true,
            skills: true,
            bio: true,
            city: true,
            state: true,
            country: true,
            linkedinUrl: true,
            githubUrl: true,
            portfolioUrl: true,
            languages: true,
            certifications: true,
            resume: true,
          },
        },
        recruiter: {
          select: {
            fullName: true,
            email: true,
            phone: true,
            position: true,
            companyName: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes, reviewedDate } = body;

    // Validate status
    const validStatuses = ["Applied", "Under Review", "Shortlisted", "Rejected", "Hired"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id },
      data: {
        status: status || undefined,
        notes: notes || undefined,
        reviewedDate: reviewedDate ? new Date(reviewedDate) : undefined,
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

    return NextResponse.json({
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
} 