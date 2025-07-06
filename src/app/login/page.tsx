"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for heavy components
const LoginForm = dynamic(() => import('./LoginForm'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900">
      <div className="w-full max-w-6xl grid lg:grid-cols-5 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-2">
          <div className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl p-8 rounded-lg animate-pulse">
            <div className="h-8 bg-white/20 rounded mb-4"></div>
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-4 bg-white/20 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-12 bg-white/20 rounded"></div>
              <div className="h-12 bg-white/20 rounded"></div>
              <div className="h-12 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="h-64 bg-white/10 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

const Login = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return <LoginForm />;
};

export default Login;
