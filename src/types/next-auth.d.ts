import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: 'user' | 'partner' | 'admin';
    };
    expires: string;
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: 'user' | 'partner' | 'admin';
    rememberMe?: boolean;
  }

  interface JWT {
    id: string;
    role: 'user' | 'partner' | 'admin';
    rememberMe?: boolean;
    exp?: number;
    sub: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'user' | 'partner' | 'admin';
  }
}
