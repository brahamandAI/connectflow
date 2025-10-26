import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    console.log("=== Resume API GET Request ===");
    
    const session = await getServerSession(authOptions);
    console.log("GET - Session:", session ? "Found" : "Not found");
    console.log("GET - User role:", session ? (session.user as any)?.role : "No session");
    
    if (!session || (session.user as any)?.role !== "jobseeker") {
      return NextResponse.json({ 
        error: "Unauthorized",
        details: "Must be logged in as jobseeker"
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobSeekerId = searchParams.get("jobSeekerId");

    if (!jobSeekerId) {
      return NextResponse.json({ 
        error: "Job seeker ID is required",
        details: "No jobSeekerId provided in query parameters"
      }, { status: 400 });
    }

    console.log("Fetching resumes for jobSeekerId:", jobSeekerId);

    // Get resumes for this job seeker
    const resumes = await prisma.resume.findMany({
      where: {
        jobSeekerId: jobSeekerId,
        isActive: true
      },
      orderBy: {
        lastModified: "desc"
      }
    });

    console.log("Found resumes:", resumes.length);
    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Resumes API GET - error:", error);
    return NextResponse.json({ 
      error: "Failed to fetch resumes",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}



export async function POST(request: NextRequest) {
  try {
    console.log("=== Resume API POST Request ===");
    
    // Test if the API is reachable
    console.log("API endpoint reached successfully");
    
    const session = await getServerSession(authOptions);
    console.log("Session:", session ? "Found" : "Not found");
    console.log("User role:", session ? (session.user as any)?.role : "No session");
    console.log("User ID:", session ? (session.user as any)?.id : "No ID");
    
    if (!session || (session.user as any)?.role !== "jobseeker") {
      console.log("Unauthorized access - returning 401");
      return NextResponse.json({ 
        error: "Unauthorized", 
        details: "Must be logged in as jobseeker",
        session: session ? "exists" : "missing",
        role: session ? (session.user as any)?.role : "none"
      }, { status: 401 });
    }

    const data = await request.json();
    console.log("Request data received:", {
      name: data.name,
      template: data.template,
      hasResumeData: !!data.resumeData
    });
    
    const { name, template, resumeData } = data;

    if (!name || !template || !resumeData) {
      console.log("Missing required fields:", { name, template, hasResumeData: !!resumeData });
      return NextResponse.json({ 
        error: "Missing required fields",
        details: { name: !!name, template: !!template, resumeData: !!resumeData }
      }, { status: 400 });
    }

    console.log("Creating resume for jobSeekerId:", (session.user as any).id);

    // Test Prisma connection
    try {
      await prisma.$connect();
      console.log("Prisma connected successfully");
    } catch (dbError) {
      console.error("Prisma connection error:", dbError);
      return NextResponse.json({ 
        error: "Database connection failed",
        details: dbError instanceof Error ? dbError.message : "Unknown database error"
      }, { status: 500 });
    }

    // Create new resume
    const resume = await prisma.resume.create({
      data: {
        jobSeekerId: (session.user as any).id,
        name,
        template,
        data: resumeData,
        lastModified: new Date(),
        jobApplications: 0,
        isActive: true
      }
    });

    console.log("Resume created successfully:", resume.id);
    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error("=== Error creating resume ===");
    console.error("Error details:", error);
    console.error("Error message:", error instanceof Error ? error.message : "Unknown error");
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    
    return NextResponse.json({ 
      error: "Failed to create resume",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 