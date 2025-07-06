import { connectToDatabase } from '@/lib/mongodb';
import nodemailer from 'nodemailer';

export async function GET() {
  // Test MongoDB Connection
  let mongoStatus = {
    connected: false,
    error: '',
    collections: [] as string[]
  };

  // Test Email Configuration
  let emailStatus = {
    configured: false,
    error: '',
    testEmailSent: false,
    config: {
      hasHost: !!process.env.BREVO_SMTP_HOST,
      hasUser: !!process.env.BREVO_SMTP_USER,
      hasPassword: !!process.env.BREVO_SMTP_PASSWORD,
      hasPort: !!process.env.BREVO_SMTP_PORT,
      hasFrom: !!process.env.EMAIL_FROM
    }
  };

  // Test MongoDB Connection
  try {
    const db = await connectToDatabase();
    const collections = await db.listCollections().toArray();
    mongoStatus = {
      connected: true,
      error: '',
      collections: collections.map(c => c.name)
    };
  } catch (error) {
    mongoStatus = {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      collections: []
    };
  }

  // Test Email Configuration
  try {
    if (!process.env.BREVO_SMTP_HOST || !process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASSWORD) {
      throw new Error('Brevo SMTP credentials not fully configured');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      requireTLS: true, // Force TLS
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      },
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
      debug: true, // Show debug output
      logger: true // Log to console
    });

    emailStatus.configured = true;

    // Try to send a test email if in development
    if (process.env.NODE_ENV === 'development') {
      try {
        const fromMatch = process.env.EMAIL_FROM?.match(/"?([^<]*)"?\s*<([^>]*)>/);
        const fromName = fromMatch?.[1]?.trim() || 'Test';
        const fromEmail = fromMatch?.[2]?.trim() || process.env.BREVO_SMTP_USER;
        
        await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: fromEmail,
          subject: 'Test Email from Turbo Travels',
          text: 'This is a test email from your Turbo Travels application.',
          html: '<p>This is a test email from your <strong>Turbo Travels</strong> application.</p>',
        });
        emailStatus.testEmailSent = true;
      } catch (emailError) {
        emailStatus.error = emailError instanceof Error ? emailError.message : 'Failed to send test email';
      }
    }
  } catch (error) {
    emailStatus = {
      configured: false,
      error: error instanceof Error ? error.message : 'Email configuration error',
      testEmailSent: false,
      config: {
        hasHost: !!process.env.BREVO_SMTP_HOST,
        hasUser: !!process.env.BREVO_SMTP_USER,
        hasPassword: !!process.env.BREVO_SMTP_PASSWORD,
        hasPort: !!process.env.BREVO_SMTP_PORT,
        hasFrom: !!process.env.EMAIL_FROM
      }
    };
  }

  return Response.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    mongo: mongoStatus,
    email: emailStatus,
    environment: process.env.NODE_ENV || 'development',
  });
}
