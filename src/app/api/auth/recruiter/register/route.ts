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
      position,
      companyName,
      companySize,
      industry,
      website,
      city,
      state,
      country,
      companyDescription,
    } = body;

    // Validate required fields
    const requiredFields = { email, password, fullName, companyName };
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
    const existingRecruiter = await prisma.recruiter.findFirst({
      where: {
        email: {
          equals: normalizedEmail,
          mode: 'insensitive'
        }
      },
    });

    if (existingRecruiter) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create recruiter
    const recruiter = await prisma.recruiter.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        fullName,
        phone: phone || null,
        position: position || null,
        companyName,
        companySize: companySize || null,
        industry: industry || null,
        website: website || null,
        city: city || null,
        state: state || null,
        country: country || null,
        companyDescription: companyDescription || null,
        profileComplete: true,
      },
    });

    // Remove password from response
    const { password: _, ...recruiterWithoutPassword } = recruiter;

    return NextResponse.json(
      { 
        message: "Registration successful",
        user: recruiterWithoutPassword 
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