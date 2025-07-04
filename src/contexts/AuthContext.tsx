'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';

type Role = 'user' | 'partner' | 'admin';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role;
}

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
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const signIn = async ({ email, password, rememberMe = false, redirectTo }: SignInCredentials) => {
    try {
      console.log('Attempting sign in for:', email, { rememberMe });
      
      // Determine the default redirect URL based on user role
      const getDefaultRedirectUrl = (role: string) => {
        switch (role) {
          case 'admin':
            return '/admin/dashboard';
          case 'partner':
            return '/partner/dashboard';
          case 'user':
          default:
            return '/dashboard';
        }
      };

      const result = await nextAuthSignIn('credentials', {
        redirect: false,
        email,
        password,
        rememberMe,
        callbackUrl: redirectTo || getDefaultRedirectUrl('user'), // Default to user dashboard
      });

      console.log('Sign in result:', { 
        success: !result?.error, 
        error: result?.error,
        url: result?.url,
        defaultUrl: redirectTo || getDefaultRedirectUrl('user')
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Get the user's role from the result URL or use default
      let finalUrl = result?.url || '';
      
      // If we don't have a URL from NextAuth, use our default based on role
      if (!finalUrl) {
        // Get the current session to determine the user's role
        const session = await getSession();
        const userRole = (session?.user as any)?.role || 'user';
        finalUrl = getDefaultRedirectUrl(userRole);
      }
      
      console.log('Final redirect URL:', finalUrl);

      // Ensure we have a valid URL
      if (finalUrl) {
        // Ensure we're not already on the target page to prevent infinite redirects
        const targetPath = new URL(finalUrl, window.location.origin).pathname;
        if (window.location.pathname !== targetPath) {
          router.push(finalUrl);
        }
      } else {
        // Fallback to dashboard if no URL is determined
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Sign in error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Rethrow with a more user-friendly message
      const errorMessage = error.message.includes('CredentialsSignin') 
        ? 'Invalid email or password'
        : error.message || 'An error occurred during sign in';
      
      throw new Error(errorMessage);
    }
  };

  const signUp = async ({ name, email, password, phone, employeeId, role = 'user', redirectTo = '/' }: SignUpCredentials) => {
    try {
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
        await signIn({ email, password, redirectTo });
        return data.user;
      } catch (signInError) {
        console.error('Auto sign-in after signup failed:', signInError);
        // Even if auto sign-in fails, the account was created successfully
        // Redirect to login page with success message
        router.push(`/login?message=Account created successfully! Please sign in.`);
        return data.user;
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'An error occurred during signup. Please try again.');
    }
  };

  const signOut = async () => {
    try {
      await nextAuthSignOut({ redirect: false });
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setUser({
        id: session.user?.id || '',
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
        role: (session.user?.role as Role) || 'user',
      });
    } else if (status === 'unauthenticated') {
      setUser(null);
    }
    setIsLoading(status === 'loading');
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export type { Role, SignUpCredentials };
export default AuthContext;
