"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Mail, Lock, Mountain, Snowflake, Star, Chrome } from "lucide-react";
import Link from "next/link";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Mountain Layers with Parallax */}
        <div 
          className="absolute bottom-0 w-full h-full opacity-30 hidden sm:block"
          style={{
            transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.01}px)`,
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><path d="M0 400L200 300L400 350L600 250L800 300L1000 200L1200 250V600H0Z" fill="%23ffffff20"/></svg>')`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-float opacity-40 hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {i % 3 === 0 ? (
              <Snowflake className="h-3 w-3 sm:h-4 sm:w-4 text-white animate-spin" style={{ animationDuration: '8s' }} />
            ) : i % 3 === 1 ? (
              <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-300 animate-pulse" />
            ) : (
              <Mountain className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-300 opacity-60" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 py-12 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-5 gap-6 lg:gap-8 items-center">
          {/* Signup Form - Left Side on desktop, top on mobile */}
          <div className="lg:col-span-2 animate-slide-up order-2 lg:order-1">
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <CardHeader className="text-center space-y-4 p-4 sm:p-6">
                <div className="animate-fade-in">
                  <Badge variant="outline" className="mb-4 text-emerald-300 border-emerald-300/50 bg-emerald-500/10 text-xs sm:text-sm">
                    Start Your Adventure
                  </Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Create an Account
                  </CardTitle>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Join us to explore the mystical lands of Sikkim
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                {/* Google Signup Button */}
                <Button
                  variant="outline"
                  className="w-full bg-white/5 hover:bg-white/10 border-white/20 text-white backdrop-blur-md h-12"
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-transparent text-white/60">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80 text-sm">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-focus-within:text-emerald-300 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder-white/50 h-12 focus:border-emerald-300/50 focus:ring-1 focus:ring-emerald-300/30 transition-all"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/80 text-sm">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-focus-within:text-emerald-300 transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder-white/50 h-12 focus:border-emerald-300/50 focus:ring-1 focus:ring-emerald-300/30 transition-all"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-emerald-300 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white/80 text-sm">Confirm Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-focus-within:text-emerald-300 transition-colors" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder-white/50 h-12 focus:border-emerald-300/50 focus:ring-1 focus:ring-emerald-300/30 transition-all"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-emerald-300 transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white h-12 font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </form>

                <div className="text-center text-sm text-white/70 pt-2">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="text-emerald-300 hover:text-emerald-200 font-medium hover:underline transition-colors"
                  >
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Image/Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="relative h-56 sm:h-72 md:h-80 lg:h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <div className="max-w-md">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Discover Sikkim&apos;s Hidden Gems</h2>
                  <p className="text-white/80 text-sm sm:text-base">
                    Join our community of travelers and unlock exclusive deals, personalized recommendations, and seamless trip planning for your next Sikkim adventure.
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  You can complete your profile details after signing up
                </p>
              </div>
            </div>
          </div>
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