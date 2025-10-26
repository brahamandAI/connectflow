import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Update last login time
    await prisma.jobSeeker.update({
      where: { email },
      data: {
        lastLogin: new Date(),
      },
    });

    return NextResponse.json({
      message: "Last login time updated successfully",
    });
  } catch (error) {
    console.error("Update last login error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating last login time" },
      { status: 500 }
    );
  }
} 