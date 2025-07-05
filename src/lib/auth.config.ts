import type { NextAuthOptions, DefaultSession, User as NextAuthUser, Session } from 'next-auth';
import { getServerSession as getServerSessionHelper } from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

type UserRole = 'user' | 'partner' | 'admin';

// Extend built-in types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    role: UserRole;
    rememberMe?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    rememberMe?: boolean;
  }
}

export const authConfig: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
        token.rememberMe = (user as NextAuthUser & { rememberMe?: boolean }).rememberMe;
      }

      // Update token from session if triggered by update()
      if (trigger === 'update' && session) {
        return { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = (token.role as UserRole) || 'user';
        if (token.exp && typeof token.exp === 'number') {
          session.expires = new Date(token.exp * 1000).toISOString();
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      
      try {
        const urlObj = new URL(url);
        if (urlObj.origin === baseUrl) return url;
        
        // Default redirect to dashboard
        return `${baseUrl}/dashboard`;
      } catch (error) {
        console.error('Error parsing URL:', error);
        return `${baseUrl}/dashboard`;
      }
    }
  },
  
  // Global error handler
  logger: {
    error(code, metadata) {
      if (metadata instanceof Error) {
        console.error(`[Auth Error] ${code}`, metadata);
      } else if (metadata && typeof metadata === 'object' && 'error' in metadata) {
        console.error(`[Auth Error] ${code}`, metadata.error);
      } else {
        console.error(`[Auth Error] ${code}`, metadata);
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember me', type: 'checkbox' }
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) return null;
        
        const { email, password, rememberMe } = credentials;
        
        try {
          // For development/demo purposes, allow any email/password combination
          // In production, you should implement proper user authentication
          if (!email || !password) {
            return null;
          }
          
          // Return a dummy user for testing
          return { 
            id: '1', 
            email: email, 
            name: email.split('@')[0],
            role: 'user',
            rememberMe: rememberMe === 'true'
          };
          
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    })
  ],
};

// Helper function to get the server session with proper typing
export const auth = async () => {
  return await getServerSessionHelper(authConfig);
};

// For backward compatibility
export const getServerSession = auth;

export default auth;
