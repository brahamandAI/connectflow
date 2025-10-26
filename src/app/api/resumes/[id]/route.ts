import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("=== Resume API PUT Request for ID:", id);
    
    const session = await getServerSession(authOptions);
    console.log("PUT - Session:", session ? "Found" : "Not found");
    console.log("PUT - User role:", session ? (session.user as any)?.role : "No session");
    
    if (!session || (session.user as any)?.role !== "jobseeker") {
      return NextResponse.json({ 
        error: "Unauthorized",
        details: "Must be logged in as jobseeker"
      }, { status: 401 });
    }

    const data = await request.json();
    console.log("PUT - Request data received:", {
      name: data.name,
      template: data.template,
      hasResumeData: !!data.resumeData
    });
    
    const { name, template, resumeData } = data;

    if (!name || !template || !resumeData) {
      console.log("PUT - Missing required fields:", { name, template, hasResumeData: !!resumeData });
      return NextResponse.json({ 
        error: "Missing required fields",
        details: { name: !!name, template: !!template, resumeData: !!resumeData }
      }, { status: 400 });
    }

    console.log("PUT - Updating resume with ID:", id);

    // Update the resume
    const updatedResume = await prisma.resume.update({
      where: {
        id,
        jobSeekerId: (session.user as any).id // Ensure user owns this resume
      },
      data: {
        name,
        template,
        data: resumeData,
        lastModified: new Date()
      }
    });

    console.log("PUT - Resume updated successfully:", updatedResume.id);
    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Resumes API PUT - error:", error);
    return NextResponse.json({ 
      error: "Failed to update resume",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("=== Resume API DELETE Request for ID:", id);
    
    const session = await getServerSession(authOptions);
    console.log("DELETE - Session:", session ? "Found" : "Not found");
    console.log("DELETE - User role:", session ? (session.user as any)?.role : "No session");
    
    if (!session || (session.user as any)?.role !== "jobseeker") {
      return NextResponse.json({ 
        error: "Unauthorized",
        details: "Must be logged in as jobseeker"
      }, { status: 401 });
    }

    // Check if user wants soft delete (mark as inactive) or hard delete
    const { searchParams } = new URL(request.url);
    const softDelete = searchParams.get("soft") === "true";

    console.log("DELETE - Deleting resume with ID:", id, "Soft delete:", softDelete);

    if (softDelete) {
      // Soft delete: mark as inactive
      const updatedResume = await prisma.resume.update({
        where: {
          id,
          jobSeekerId: (session.user as any).id // Ensure user owns this resume
        },
        data: {
          isActive: false
        }
      });

      console.log("DELETE - Resume soft deleted successfully:", updatedResume.id);
      return NextResponse.json({ 
        message: "Resume moved to trash successfully",
        deletedResume: updatedResume 
      });
    } else {
      // Hard delete: permanently remove from database
      const deletedResume = await prisma.resume.delete({
        where: {
          id,
          jobSeekerId: (session.user as any).id // Ensure user owns this resume
        }
      });

      console.log("DELETE - Resume hard deleted successfully:", deletedResume.id);
      return NextResponse.json({ 
        message: "Resume permanently deleted successfully",
        deletedResume 
      });
    }
  } catch (error) {
    console.error("Resumes API DELETE - error:", error);
    
    // Check if it's a "not found" error
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json({ 
        error: "Resume not found",
        details: "The resume you're trying to delete doesn't exist or you don't have permission to delete it"
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      error: "Failed to delete resume",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 