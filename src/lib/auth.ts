import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const handler = NextAuth(authConfig);

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = handler;

export default handler;
