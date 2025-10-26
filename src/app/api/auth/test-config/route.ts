import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    googleClientId: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not Set",
    googleSecret: process.env.GOOGLE_SECRET ? "Set" : "Not Set",
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? "Set" : "Not Set",
    nextAuthUrl: process.env.NEXTAUTH_URL || "Not Set",
    nodeEnv: process.env.NODE_ENV || "Not Set",
  };

  // Check if Google OAuth is properly configured
  const isGoogleConfigured = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_SECRET;
  
  return NextResponse.json({
    message: "OAuth Configuration Status",
    config,
    isGoogleConfigured,
    googleClientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0,
    googleSecretLength: process.env.GOOGLE_SECRET?.length || 0,
    timestamp: new Date().toISOString(),
  });
} 