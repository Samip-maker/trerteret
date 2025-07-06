"use client";
import React, { useMemo } from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import Image from "next/image";
import { ShieldCheck, Clock, Gift } from "lucide-react";

const heroImages = [
  "/auth-hero-1.jpg",
  "/auth-hero-2.jpg",
  "/auth-hero-3.jpg",
];

export default function AuthPage() {
  const heroImage = useMemo(() => {
    return heroImages[Math.floor(Math.random() * heroImages.length)];
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-emerald-400 via-blue-100 to-green-600 p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8">
        {/* Left: Illustration and Welcome */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <Image
            src={heroImage}
            alt="Travelers illustration"
            width={400}
            height={320}
            className="rounded-2xl shadow-lg mb-2 w-full max-w-xs md:max-w-sm lg:max-w-md"
            priority
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 drop-shadow-sm">Welcome to Turbo Travels</h1>
          <p className="text-lg text-gray-700 max-w-md">
            Sign in or create your account to unlock exclusive travel deals, manage your bookings, and join a community of explorers.
          </p>
        </div>
        {/* Right: Auth Card */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md">
          <AuthCard>
            <AuthForm />
          </AuthCard>
        </div>
      </div>
    </div>
  );
} 