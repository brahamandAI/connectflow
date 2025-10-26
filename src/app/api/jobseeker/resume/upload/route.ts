import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const resume = formData.get("resume") as File;

    if (!email || !resume) {
      return NextResponse.json(
        { error: "Email and resume file are required" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "resumes");
    await writeFile(join(uploadsDir, `${email}-${resume.name}`), Buffer.from(await resume.arrayBuffer()));

    // Update the resume URL in the database
    const resumeUrl = `/uploads/resumes/${email}-${resume.name}`;
    const updatedProfile = await prisma.jobSeeker.update({
      where: { email },
      data: { resume: resumeUrl },
    });

    // Remove sensitive data
    const { password, ...profileWithoutPassword } = updatedProfile;

    return NextResponse.json({
      message: "Resume uploaded successfully",
      resumeUrl,
      profile: profileWithoutPassword,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return NextResponse.json(
      { error: "Failed to upload resume" },
      { status: 500 }
    );
  }
} 