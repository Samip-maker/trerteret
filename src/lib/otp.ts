import nodemailer from 'nodemailer';

// In-memory store for OTPs (in production, use Redis or a database)
interface OTPData {
  otp: string;
  expiresAt: Date;
  attempts: number;
  lastAttempt?: Date;
}

const otpStore: Record<string, OTPData> = {};

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const OTP_EXPIRY_MINUTES = 10;
const RESEND_DELAY_MINUTES = 1;

// Response types
interface OTPResponse {
  success: boolean;
  message?: string;
  errorCode?: string;
  statusCode?: number;
  retryAfter?: number;
  remainingAttempts?: number;
}

// Email transporter configuration for Brevo
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

export const OTPService = {
  async sendOTP(email: string): Promise<OTPResponse> {
    try {
      // Check if there's an existing OTP that hasn't expired
      const existingOtp = otpStore[email];
      const currentTime = new Date();
      
      if (existingOtp) {
        // Check if we need to wait before allowing a new OTP
        if (existingOtp.lastAttempt && 
            existingOtp.lastAttempt.getTime() + (RESEND_DELAY_MINUTES * 60 * 1000) > currentTime.getTime()) {
          const timeLeft = Math.ceil(
            ((existingOtp.lastAttempt.getTime() + (RESEND_DELAY_MINUTES * 60 * 1000)) - currentTime.getTime()) / 1000
          );
          
          return {
            success: false,
            message: `Please wait ${Math.ceil(timeLeft / 60)} minutes before requesting a new OTP`,
            errorCode: 'TOO_MANY_REQUESTS',
            statusCode: 429,
            retryAfter: timeLeft
          };
        }
        
        // If existing OTP is still valid, don't send a new one
        if (existingOtp.expiresAt > currentTime) {
          const timeLeft = Math.ceil((existingOtp.expiresAt.getTime() - currentTime.getTime()) / 1000 / 60);
          return {
            success: false,
            message: `Please wait for the existing OTP to expire (${timeLeft} minutes)`,
            errorCode: 'OTP_ALREADY_SENT',
            statusCode: 400
          };
        }
      }

      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

      // Store OTP
      otpStore[email] = {
        otp,
        expiresAt,
        attempts: 0,
        lastAttempt: now
      };

      // Send email with Brevo
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Your Verification Code - Sikkim Trails',
          text: `Your Sikkim Trails verification code is: ${otp}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
              <div style="background-color: #10b981; padding: 20px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 24px;">Sikkim Trails</h1>
                <p style="margin: 5px 0 0; font-size: 16px;">Your Adventure Awaits</p>
              </div>
              
              <div style="padding: 20px; background-color: #f9fafb;">
                <h2 style="color: #111827; margin-top: 0;">Email Verification</h2>
                <p>Hello,</p>
                <p>Your verification code for Sikkim Trails is:</p>
                
                <div style="background-color: #ffffff; border: 1px solid #e5e7eb; 
                          border-radius: 8px; padding: 15px; margin: 20px 0; 
                          text-align: center; font-size: 24px; font-weight: bold;
                          letter-spacing: 5px; color: #1e40af;">
                  ${otp.match(/\d{1}/g)?.join(' ')}
                </div>
                
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 25px;">
                  This code will expire in ${OTP_EXPIRY_MINUTES} minutes. Please do not share this code with anyone.
                </p>
                
                <p>If you didn't request this code, you can safely ignore this email.</p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; 
                          color: #6b7280; font-size: 12px;">
                  <p>© ${new Date().getFullYear()} Sikkim Trails. All rights reserved.</p>
                  <p>This is an automated message, please do not reply to this email.</p>
                </div>
              </div>
            </div>
          `
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to send email:', errorMessage);
        // Remove the OTP since we failed to send the email
        delete otpStore[email];
        
        return {
          success: false,
          message: 'Failed to send verification email. Please try again later.',
          errorCode: 'EMAIL_SEND_FAILED',
          statusCode: 500
        };
      }

      return { 
        success: true,
        message: 'OTP sent successfully' 
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error sending OTP:', errorMessage);
      return {
        success: false,
        message: 'Failed to send verification code. Please try again.',
        errorCode: 'INTERNAL_ERROR',
        statusCode: 500
      };
    }
  },

  async verifyOTP(email: string, otp: string): Promise<OTPResponse> {
    try {
      const now = new Date();
      const storedOtp = otpStore[email];

      // Check if OTP exists
      if (!storedOtp) {
        return {
          success: false,
          message: 'No verification code found. Please request a new one.',
          errorCode: 'OTP_NOT_FOUND',
          statusCode: 400
        };
      }

      // Check if OTP is expired
      if (storedOtp.expiresAt < now) {
        delete otpStore[email];
        return {
          success: false,
          message: 'Verification code has expired. Please request a new one.',
          errorCode: 'OTP_EXPIRED',
          statusCode: 400
        };
      }

      // Check max attempts
      if (storedOtp.attempts >= MAX_ATTEMPTS) {
        delete otpStore[email];
        return {
          success: false,
          message: 'Too many attempts. Please request a new verification code.',
          errorCode: 'TOO_MANY_ATTEMPTS',
          statusCode: 429
        };
      }

      // Verify OTP
      if (storedOtp.otp !== otp) {
        storedOtp.attempts++;
        const remainingAttempts = MAX_ATTEMPTS - storedOtp.attempts;
        
        // If no more attempts, delete the OTP
        if (remainingAttempts <= 0) {
          delete otpStore[email];
          return {
            success: false,
            message: 'Too many incorrect attempts. Please request a new verification code.',
            errorCode: 'TOO_MANY_ATTEMPTS',
            statusCode: 429
          };
        }
        
        return {
          success: false,
          message: `Invalid verification code. ${remainingAttempts} attempt${remainingAttempts > 1 ? 's' : ''} remaining.`,
          errorCode: 'INVALID_OTP',
          remainingAttempts,
          statusCode: 400
        };
      }

      // OTP is valid, clean up
      delete otpStore[email];
      return { 
        success: true,
        message: 'OTP verified successfully.'
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        message: 'An error occurred while verifying the code. Please try again.',
      };
    }
  },
};

export default OTPService;
