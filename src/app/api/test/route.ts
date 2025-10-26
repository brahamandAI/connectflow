import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: "Test API is working",
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  return NextResponse.json({ 
    message: "Test POST is working",
    receivedData: data,
    timestamp: new Date().toISOString()
  });
} 