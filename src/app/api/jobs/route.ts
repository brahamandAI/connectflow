import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recruiterId = searchParams.get("recruiterId");
    const limit = searchParams.get("limit");
    const sort = searchParams.get("sort");
    
    // Build where clause
    const where: any = {};
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
          where.postedBy = recruiter.id;
        } else {
          // If no recruiter record found, return empty results
          return NextResponse.json({ 
            jobs: [],
            pagination: {
              hasNext: false,
              total: 0
            }
          });
        }
      } else {
        // Assume it's a legacy recruiter ID
        where.postedBy = recruiterId;
      }
    }
    
    // Build orderBy clause
    let orderBy: any = { postedDate: "desc" };
    if (sort === "recent") {
      orderBy = { postedDate: "desc" };
    } else if (sort === "oldest") {
      orderBy = { postedDate: "asc" };
    } else if (sort === "salary") {
      orderBy = { salaryMax: "desc" };
    }
    
    // Build query options
    const queryOptions: any = {
      where,
      orderBy
    };
    
    // Add limit if specified
    if (limit) {
      queryOptions.take = parseInt(limit);
    }
    
    // Get jobs
    const jobs = await prisma.job.findMany(queryOptions);
    
    // Get unique recruiter IDs from jobs
    const recruiterIds = [...new Set(jobs.map(job => job.postedBy).filter(Boolean))];
    
    // Fetch recruiter data separately to avoid Prisma relation errors
    const recruiters = await prisma.recruiter.findMany({
      where: {
        id: { in: recruiterIds }
      },
      select: {
        id: true,
        fullName: true,
        companyName: true
      }
    });
    
    // Create a map of recruiter data for quick lookup
    const recruiterMap = new Map(recruiters.map(r => [r.id, r]));
    
    // Transform jobs to match the expected format
    const transformedJobs = jobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      employmentType: job.employmentType,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      postedDate: job.postedDate.toISOString(),
      tags: job.requirements || [],
      description: job.description,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      benefits: job.benefits,
      recruiter: recruiterMap.get(job.postedBy) || null
    }));
    
    return NextResponse.json({ 
      jobs: transformedJobs,
      pagination: {
        hasNext: jobs.length === (limit ? parseInt(limit) : jobs.length),
        total: jobs.length
      }
    });
  } catch (error) {
    console.error("Jobs API - error:", error);
    console.error("Jobs API - error details:", error instanceof Error ? error.message : String(error));
    console.error("Jobs API - stack:", error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json({ 
      error: "Failed to fetch jobs",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await req.json();
    
    // Get the recruiter ID from the Recruiter table using the user's email
    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }
    
    // Check if recruiter exists in legacy Recruiter table
    let recruiter = await prisma.recruiter.findUnique({
      where: { email: userEmail },
      select: { id: true, fullName: true, companyName: true }
    });
    
    // If not found, create recruiter profile from unified User data
    if (!recruiter) {
      console.log('Recruiter not found in legacy table for job posting, checking unified User...');
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
          companyName: true
        }
      });
      console.log('Created recruiter profile for job posting:', recruiter.id);
    }
    
    const job = await prisma.job.create({
      data: {
        ...data,
        postedBy: recruiter.id,
        postedDate: new Date(),
        applicantsCount: 0,
      },
    });
    
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ 
      error: "Failed to create job",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 