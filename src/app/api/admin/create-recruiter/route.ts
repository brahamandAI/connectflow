import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, fullName, companyName } = await request.json();
    
    // Check if user already exists
    const existingRecruiter = await prisma.recruiter.findUnique({
      where: { email },
    });
    
    if (existingRecruiter) {
      return NextResponse.json({
        message: "Recruiter already exists",
        user: {
          id: existingRecruiter.id,
          email: existingRecruiter.email,
          fullName: existingRecruiter.fullName,
          companyName: existingRecruiter.companyName,
          role: "recruiter"
        },
        timestamp: new Date().toISOString(),
      });
    }
    
    // Create new recruiter
    const newRecruiter = await prisma.recruiter.create({
      data: {
        email,
        fullName,
        companyName,
        password: null, // No password for OAuth users
        profileComplete: false,
        phone: "",
        position: "",
        companySize: "",
        industry: "",
        website: "",
        city: "",
        state: "",
        country: "",
        bio: "",
        linkedinUrl: "",
        companyDescription: "",
        companyLogo: "",
        companyBenefits: [],
        hiringNeeds: [],
        preferredLocations: [],
      },
    });

    return NextResponse.json({
      message: "Recruiter created successfully",
      user: {
        id: newRecruiter.id,
        email: newRecruiter.email,
        fullName: newRecruiter.fullName,
        companyName: newRecruiter.companyName,
        role: "recruiter"
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Create recruiter error:", error);
    return NextResponse.json(
      {
        message: "Failed to create recruiter",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 