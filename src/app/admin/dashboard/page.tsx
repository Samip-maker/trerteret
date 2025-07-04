'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/pages/AdminDashboard';

export default function AdminDashboardPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/admin/dashboard');
    },
  });

  // Check if user has admin role
  if (session?.user.role !== 'admin') {
    redirect('/');
  }

  return <AdminDashboard />;
}
