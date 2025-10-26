import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, id, createdAt, updatedAt, isActive, profileComplete, emailVerified, phoneVerified, ...updateData } = data;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Update the job seeker profile
    const updatedProfile = await prisma.jobSeeker.update({
      where: { email },
      data: {
        fullName: updateData.fullName,
        phone: updateData.phone,
        currentJobTitle: updateData.currentJobTitle,
        yearsOfExperience: updateData.yearsOfExperience,
        education: updateData.education,
        skills: updateData.skills || [],
        resume: updateData.resume,
        city: updateData.city,
        state: updateData.state,
        country: updateData.country,
        bio: updateData.bio,
        linkedinUrl: updateData.linkedinUrl,
        githubUrl: updateData.githubUrl,
        portfolioUrl: updateData.portfolioUrl,
        preferredJobTypes: updateData.preferredJobTypes || [],
        expectedSalary: updateData.expectedSalary,
        noticePeriod: updateData.noticePeriod,
        languages: updateData.languages || [],
        certifications: updateData.certifications || [],
      },
    });

    // Remove sensitive data
    const { password, ...profileWithoutPassword } = updatedProfile;

    return NextResponse.json(profileWithoutPassword);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
} 