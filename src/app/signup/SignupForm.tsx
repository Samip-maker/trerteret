"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Lock, Mountain, Chrome } from "lucide-react";
import Link from "next/link";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleGoogleSignup = async () => {
    console.log('Google signup clicked');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Elements */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-60 hidden sm:block"
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-40 animate-pulse" />
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Form Card */}
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-slide-up">
            <CardHeader className="text-center p-4 sm:p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg">
                  <Mountain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <Badge variant="outline" className="mb-4 text-emerald-300 border-emerald-300/50 bg-emerald-500/10 mx-auto w-fit text-xs sm:text-sm">
                Join the Journey
              </Badge>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
                Create Account
              </CardTitle>
              <p className="text-gray-300 text-sm sm:text-base">
                Start your adventure with just a few details
              </p>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              {/* Google Signup Button */}
              <Button
                type="button"
                onClick={handleGoogleSignup}
                variant="outline"
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300 font-medium py-2 sm:py-3 text-sm sm:text-base"
              >
                <Chrome className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-gray-400">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium text-sm sm:text-base">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-400 text-sm sm:text-base h-10 sm:h-11"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium text-sm sm:text-base">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-400 text-sm sm:text-base h-10 sm:h-11"
                      placeholder="Create password"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white font-medium text-sm sm:text-base">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-400 text-sm sm:text-base h-10 sm:h-11"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2 sm:py-3 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-gray-300 text-sm sm:text-base">
                  Already have an account?{' '}
                  <Link href="/login" className="text-emerald-300 hover:text-emerald-200 font-semibold transition-colors">
                    Sign In
                  </Link>
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  You can complete your profile details after signing up
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>
        {`
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SignupForm; 