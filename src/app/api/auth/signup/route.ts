import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { OTPService } from '@/lib/otp';

export async function POST(request: Request) {
  try {
    const { name, email, phone, otp } = await request.json();

    // Validate required fields
    if (!name || !email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and OTP are required' },
        { status: 400 }
      );
    }

    // Verify OTP first
    const otpVerification = await OTPService.verifyOTP(email, otp);
    if (!otpVerification.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: otpVerification.message || 'Invalid or expired OTP',
          errorCode: 'INVALID_OTP',
          remainingAttempts: otpVerification.remainingAttempts
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Generate a random password (not needed for login, just for security)
    const randomPassword = Math.random().toString(36).slice(-12);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Create new user
    const user = new User({
      name,
      email,
      phone: phone || '',
      password: hashedPassword,
      emailVerified: new Date(),
      role: 'user',
    });

    await user.save();

    // Return user data (excluding password)
    const userObj = user.toObject();
    delete userObj.password;

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: userObj,
    });
  } catch (error: any) {
    console.error('Error in signup:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Internal server error',
        errorCode: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}
