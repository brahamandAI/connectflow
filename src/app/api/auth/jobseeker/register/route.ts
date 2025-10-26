import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      fullName,
      phone,
      currentJobTitle,
      yearsOfExperience,
      education,
      skills,
    } = body;

    // Validate required fields
    const requiredFields = { email, password, fullName };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: `Missing required fields: ${missingFields.join(", ")}`,
          fields: missingFields 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Normalize email: trim whitespace and convert to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists (case-insensitive)
    const existingJobSeeker = await prisma.jobSeeker.findFirst({
      where: {
        email: {
          equals: normalizedEmail,
          mode: 'insensitive'
        }
      },
    });

    if (existingJobSeeker) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create job seeker
    const jobSeeker = await prisma.jobSeeker.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        fullName,
        phone: phone || null,
        currentJobTitle: currentJobTitle || null,
        yearsOfExperience: yearsOfExperience || null,
        education: education || null,
        skills: skills || [],
        profileComplete: true,
      },
    });

    // Remove password from response
    const { password: _, ...jobSeekerWithoutPassword } = jobSeeker;

    return NextResponse.json(
      {
        message: "Registration successful",
        user: jobSeekerWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint failed")) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 400 }
        );
      }

      if (error.message.includes("Invalid data")) {
        return NextResponse.json(
          { error: "Invalid data provided" },
          { status: 400 }
        );
      }

      if (error.message.includes("Connection")) {
        return NextResponse.json(
          { error: "Database connection error. Please try again later." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
} 