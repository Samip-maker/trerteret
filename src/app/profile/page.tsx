'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import UserProfile from '@/components/pages/UserProfile';

export default function ProfilePage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/profile');
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <UserProfile />;
}
