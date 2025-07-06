import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { OTPService } from '@/lib/otp';

function isValidOTP(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();
    
    // Input validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Please provide a valid email address',
        errorCode: 'INVALID_EMAIL'
      }, { status: 400 });
    }

    if (!otp || !isValidOTP(otp)) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid 6-digit verification code',
        errorCode: 'INVALID_OTP_FORMAT'
      }, { status: 400 });
    }

    // Verify OTP
    const verificationResult = await OTPService.verifyOTP(email, otp);
    
    if (!verificationResult.success) {
      let statusCode = 400;
      let errorCode = 'INVALID_OTP';
      
      if (verificationResult.message?.includes('expired')) {
        statusCode = 410; // Gone
        errorCode = 'OTP_EXPIRED';
      } else if (verificationResult.message?.includes('attempts')) {
        statusCode = 429; // Too Many Requests
        errorCode = 'MAX_ATTEMPTS_REACHED';
      }
      
      return NextResponse.json({
        success: false,
        message: verificationResult.message || 'Invalid verification code',
        errorCode,
        remainingAttempts: verificationResult.remainingAttempts
      }, { status: statusCode });
    }

    // For development, create user if not exists
    const db = await connectToDatabase();
    let user = await db.collection('users').findOne({ email });
    
    if (!user && process.env.NODE_ENV === 'development') {
      try {
        const result = await db.collection('users').insertOne({
          email,
          name: email.split('@')[0],
          role: 'user',
          emailVerified: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        user = {
          _id: result.insertedId,
          email,
          name: email.split('@')[0],
          role: 'user',
          emailVerified: new Date()
        };
      } catch (dbError) {
        console.error('Error creating user:', dbError);
        // Continue with login if user was created by another request
        user = await db.collection('users').findOne({ email });
      }
    }

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Account not found. Please sign up first.',
        errorCode: 'USER_NOT_FOUND'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully!',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    });
    
  } catch (error: unknown) {
    console.error('Error in verify-otp:', error);
    let message = 'An unexpected error occurred. Please try again.';
    let name = '';
    let code = '';
    if (error && typeof error === 'object') {
      const errObj = error as Record<string, unknown>;
      if ('message' in errObj && typeof errObj.message === 'string') {
        message = errObj.message;
      }
      if ('name' in errObj && typeof errObj.name === 'string') {
        name = errObj.name;
      }
      if ('code' in errObj && typeof errObj.code === 'string') {
        code = errObj.code;
      }
    }
    // Handle database connection errors
    if (name === 'MongoNetworkError' || code === 'ECONNREFUSED') {
      return NextResponse.json({
        success: false,
        message: 'Database connection error. Please try again later.',
        errorCode: 'DATABASE_ERROR'
      }, { status: 503 });
    }
    // Default error response
    return NextResponse.json({
      success: false,
      message,
      errorCode: 'INTERNAL_SERVER_ERROR'
    }, { status: 500 });
  }
}