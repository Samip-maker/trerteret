import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

// Helper function to handle errors
const handleError = (message: string, status: number = 400) => {
  console.error(`Signup Error (${status}):`, message);
  return NextResponse.json(
    { message },
    { status }
  );
};

export async function POST(request: Request) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return handleError('Invalid JSON payload');
    }

    const { name, email, password, phone, role = 'user' } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return handleError('Please enter a valid email address');
    }

    // Validate password length
    if (password.length < 6) {
      return handleError('Password must be at least 6 characters long');
    }

    try {
      // Connect to MongoDB
      await connectDB();
      console.log('Successfully connected to MongoDB');
      
      // Check if user already exists
      const existingUser = await User.findOne({ email }).select('_id').lean();
      console.log('Existing user check:', existingUser);

      if (existingUser) {
        return handleError('User with this email already exists');
      }

      // Create user (password will be hashed by the pre-save hook)
      interface UserData {
        name: string;
        email: string;
        password: string;
        phone?: string;
        role?: string;
        employeeId?: string;
      }

      const userData: UserData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        phone: phone?.trim(),
        role,
      };

      // Only include employeeId if it's provided
      if (body.employeeId) {
        userData.employeeId = body.employeeId;
      }

      console.log('Creating user with data:', { ...userData, password: '[REDACTED]' });
      
      const user = await User.create(userData);
      console.log('User created:', { id: user._id, email: user.email });

      // Return user data without password
      const userObject = user.toObject();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = userObject;

      return NextResponse.json(
        { 
          user: userWithoutPassword, 
          message: 'User created successfully',
          success: true 
        },
        { status: 201 }
      );
    } catch (error: unknown) {
      const dbError = error as { 
        code?: number; 
        keyPattern?: Record<string, unknown>; 
        keyValue?: Record<string, unknown>;
        name: string;
        message: string;
        errors?: Record<string, { message: string }>;
        stack?: string;
      };
      console.error('Database operation failed:', {
        name: dbError.name,
        code: dbError.code,
        keyPattern: dbError.keyPattern,
        keyValue: dbError.keyValue,
        message: dbError.message,
        stack: dbError.stack
      });
      
      if (dbError.code === 11000) {
        // Handle duplicate key error
        const field = Object.keys(dbError.keyPattern || {})[0];
        return handleError(`${field} already exists`);
      } else if (dbError.name === 'ValidationError' && dbError.errors) {
        const errors = Object.values(dbError.errors).map(err => err.message);
        return handleError(errors.join(', '));
      }
      return handleError('Database operation failed: ' + dbError.message, 500);
    }
  } catch (error) {
    const err = error as Error;
    console.error('Unexpected error in signup:', err);
    return handleError('An unexpected error occurred: ' + err.message, 500);
  }
}
