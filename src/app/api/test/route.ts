import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    mongoUri: process.env.MONGODB_URI ? '✅ MONGODB_URI is set' : '❌ MONGODB_URI is not set',
    nodeEnv: process.env.NODE_ENV || 'Not set',
  });
}
