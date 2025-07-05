'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react';
import type { User } from 'next-auth';

type Role = 'user' | 'partner' | 'admin';

// Extend the User type from next-auth
type ExtendedUser = User & {
  role: Role;
};

interface SignInCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  redirectTo?: string;
}

interface SignUpCredentials extends SignInCredentials {
  name: string;
  phone?: string;
  role?: Role;
  employeeId?: string;
}

interface AuthContextType {
  user: ExtendedUser | null;
  isLoading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const signIn = async ({ email, password, rememberMe, redirectTo = '/' }: SignInCredentials) => {
    try {
      setIsLoading(true);
      console.log('Attempting sign in for:', email, { rememberMe });
      
      // Ensure redirectTo is always a string
      const safeRedirectTo = redirectTo || '/';
      
      const result = await nextAuthSignIn('credentials', {
        redirect: false,
        email,
        password,
        rememberMe,
        callbackUrl: safeRedirectTo,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.url) {
        router.push(result.url);
      } else {
        router.push(safeRedirectTo);
      }
      router.refresh();
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      setIsLoading(true);
      const { 
        name, 
        email, 
        password, 
        phone, 
        role = 'user', 
        employeeId, 
        rememberMe = false,
        redirectTo = '/'
      } = credentials;

      console.log('Attempting to sign up user:', { email, role });
      
      // Call the signup API endpoint
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
          phone: phone?.trim(),
          employeeId: employeeId?.trim(),
          role,
        }),
      });

      const data = await response.json();
      console.log('Signup response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed. Please try again.');
      }

      // After successful signup, sign in the user
      try {
        await signIn({ email, password, redirectTo, rememberMe });
        return data.user;
      } catch (signInError) {
        console.error('Auto sign-in after signup failed:', signInError);
        // Even if auto sign-in fails, the account was created successfully
        // Redirect to login page with success message
        router.push(`/auth/signin?message=Account created successfully! Please sign in.`);
        return data.user;
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      console.error('Sign up error:', error);
      throw new Error(error.message || 'An error occurred during signup. Please try again.');
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await nextAuthSignOut({ 
        redirect: false,
        callbackUrl: '/'
      });
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        if (status === 'authenticated' && session?.user) {
          setUser({
            ...session.user,
            role: (session.user.role as Role) || 'user',
          });
        } else if (status === 'unauthenticated') {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } finally {
        setIsLoading(status === 'loading');
      }
    };

    checkSession();
  }, [status, session]);

  // Don't render children until initial loading is complete
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export types
export type { 
  Role, 
  SignUpCredentials, 
  SignInCredentials, 
  ExtendedUser as User,
  AuthContextType 
};

export default AuthContext;
