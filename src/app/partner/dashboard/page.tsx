'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import PartnerDashboard from '@/components/pages/PartnerDashboard';

export default function PartnerDashboardPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/partner/dashboard');
    },
  });

  // Check if user has partner role
  if (session?.user.role !== 'partner') {
    redirect('/');
  }

  return <PartnerDashboard />;
}
