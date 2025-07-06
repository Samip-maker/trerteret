import { NextResponse } from 'next/server';
import { OTPService } from '../../../lib/otp';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Required environment variables check
const requiredEnvVars = [
  'BREVO_SMTP_USER',
  'BREVO_SMTP_PASSWORD',
  'BREVO_SMTP_HOST',
  'BREVO_SMTP_PORT',
  'EMAIL_FROM'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0 && process.env.NODE_ENV !== 'test') {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
}

export async function POST(request: Request) {
  try {
    // Check for missing environment variables
    if (missingEnvVars.length > 0) {
      console.error('Missing required environment variables:', missingEnvVars);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Server configuration error',
          errorCode: 'CONFIGURATION_ERROR'
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    if (!body) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Request body is required',
          errorCode: 'INVALID_REQUEST'
        },
        { status: 400 }
      );
    }

    const { email, recaptchaToken } = body;
    
    // Quick validation without regex object creation
    if (!email?.length || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please enter a valid email address',
          errorCode: 'INVALID_EMAIL',
          field: 'email'
        },
        { status: 400 }
      );
    }

    // Skip recaptcha in development for faster testing
    if (process.env.NODE_ENV === 'production') {
      if (!recaptchaToken) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'reCAPTCHA verification required',
            errorCode: 'RECAPTCHA_REQUIRED'
          },
          { status: 400 }
        );
      }
      
      // TODO: Add actual recaptcha verification here if needed
    }

    const result = await OTPService.sendOTP(email);
    
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || 'Failed to send verification code',
          errorCode: result.errorCode || 'SEND_FAILED',
          ...(result.retryAfter && { retryAfter: result.retryAfter })
        },
        { status: result.statusCode || 429 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent'
    });

  } catch (error: unknown) {
    console.error('Error in send-otp:', error);
    let message = 'An unexpected error occurred';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as Record<string, unknown>).message === 'string') {
      message = (error as Record<string, unknown>).message as string;
    }
    return NextResponse.json(
      { 
        success: false, 
        message,
        errorCode: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}