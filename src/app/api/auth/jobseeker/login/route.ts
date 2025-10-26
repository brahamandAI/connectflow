// DEPRECATED: Authentication is now handled by NextAuth.js at /api/auth/[...nextauth].ts
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "This endpoint is deprecated. Use /api/auth/[...nextauth] instead." }, { status: 410 });
} 