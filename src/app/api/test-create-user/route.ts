import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const testEmail = `test-${Date.now()}@example.com`;
    
    // Test creating a job seeker
    const newUser = await prisma.jobSeeker.create({
      data: {
        email: testEmail,
        fullName: "Test Google User",
        password: null, // No password for OAuth users
        profileComplete: false,
        currentJobTitle: "",
        bio: "",
        education: "",
        yearsOfExperience: "",
        city: "",
        country: "",
        skills: [],
        certifications: [],
      },
    });

    // Clean up - delete the test user
    await prisma.jobSeeker.delete({
      where: { id: newUser.id },
    });

    return NextResponse.json({
      message: "User creation test successful",
      createdUserId: newUser.id,
      createdUserEmail: newUser.email,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("User creation test error:", error);
    return NextResponse.json(
      {
        message: "User creation test failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 