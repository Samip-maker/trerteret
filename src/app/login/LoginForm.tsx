"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Mail, Lock, Mountain, Snowflake, Star, Chrome } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    console.log('Google login clicked');
  };

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900">
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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-5 gap-6 lg:gap-8 items-center">
          {/* Login Form - Left Side on desktop, top on mobile */}
          <div className="lg:col-span-2 animate-slide-up order-2 lg:order-1">
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <CardHeader className="text-center space-y-4 p-4 sm:p-6">
                <div className="animate-fade-in">
                  <Badge variant="outline" className="mb-4 text-emerald-300 border-emerald-300/50 bg-emerald-500/10 text-xs sm:text-sm">
                    Gateway to Adventure
                  </Badge>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Welcome Back
                  </CardTitle>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Continue your mystical journey through Sikkim
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                {/* Google Login Button */}
                <Button
                  type="button"
                  onClick={handleGoogleLogin}
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

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2 animate-fade-in animation-delay-200">
                    <Label htmlFor="email" className="text-white font-medium text-sm sm:text-base">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300 hover:bg-white/10 text-sm sm:text-base h-10 sm:h-11"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 animate-fade-in animation-delay-400">
                    <Label htmlFor="password" className="text-white font-medium text-sm sm:text-base">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300 hover:bg-white/10 text-sm sm:text-base h-10 sm:h-11"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm animate-fade-in animation-delay-600">
                    <Link href="/forgot-password" className="text-emerald-300 hover:text-emerald-200 transition-colors">
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2 sm:py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in animation-delay-800 disabled:opacity-50 text-sm sm:text-base"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                <div className="text-center animate-fade-in animation-delay-1000">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-emerald-300 hover:text-emerald-200 font-semibold transition-colors">
                      Create Account
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hero Section - Right Side on desktop, bottom on mobile */}
          <div className="lg:col-span-3 text-center lg:text-left animate-slide-up animation-delay-200 order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
                Enter the
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Mystical Gateway
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Step through the portal to your next adventure. The sacred peaks of Sikkim await your return, 
                where ancient monasteries whisper tales of wonder and the Himalayas call your name.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">
                <Badge variant="outline" className="text-emerald-300 border-emerald-300/50 bg-emerald-500/10 animate-pulse text-xs sm:text-sm">
                  ✨ Secure Access
                </Badge>
                <Badge variant="outline" className="text-blue-300 border-blue-300/50 bg-blue-500/10 animate-pulse animation-delay-200 text-xs sm:text-sm">
                  🏔️ Adventure Awaits
                </Badge>
                <Badge variant="outline" className="text-purple-300 border-purple-300/50 bg-purple-500/10 animate-pulse animation-delay-400 text-xs sm:text-sm">
                  🙏 Sacred Journey
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginForm; 