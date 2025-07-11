"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Mail, Lock, Mountain, Snowflake, Star, Chrome, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: Array(6).fill('')
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

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

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    
    const newOtp = [...formData.otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setFormData(prev => ({ ...prev, otp: newOtp }));
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      // Move focus to previous input on backspace
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      setIsOtpSent(true);
      setCountdown(60); // 60 seconds countdown
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      setTimeout(() => clearInterval(timer), 60000);
      
      toast({
        title: 'OTP Sent',
        description: 'A verification code has been sent to your email.',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send OTP',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return false;
    }

    // Password validation
    if (formData.password.length < 8) {
      toast({
        title: 'Weak Password',
        description: 'Password must be at least 8 characters long',
        variant: 'destructive',
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords Mismatch',
        description: 'The passwords you entered do not match',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If OTP is not sent yet, validate and send OTP
    if (!isOtpSent) {
      if (!validateForm()) return;
      await sendOtp();
      return;
    }

    // If OTP is sent, verify it
    try {
      setIsVerifying(true);
      const otp = formData.otp.join('');
      
      // Send verification request with all form data
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          otp: otp
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (data.field) {
          // Focus on the field with error
          const errorField = document.getElementById(data.field);
          if (errorField) errorField.focus();
          
          // Show error message
          throw new Error(data.message || 'Validation error');
        }
        throw new Error(data.message || 'Verification failed');
      }

      // OTP verified and user created successfully
      toast({
        title: 'Success!',
        description: 'Your account has been created successfully!',
        variant: 'default',
      });

      // Redirect to dashboard or home page after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard'; // or your preferred redirect path
      }, 1500);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });

      // If OTP is invalid or expired, reset OTP state
      if (errorMessage.includes('expired') || errorMessage.includes('invalid')) {
        setIsOtpSent(false);
        setFormData(prev => ({ ...prev, otp: Array(6).fill('') }));
      }
    } finally {
      setIsVerifying(false);
    }
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

                  {isOtpSent ? (
                    <div className="space-y-4">
                      <div className="flex justify-center space-x-2">
                        {formData.otp.map((digit, index) => (
                          <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 text-center text-xl bg-white/5 border-white/20 text-white focus:border-emerald-300/50 focus:ring-1 focus:ring-emerald-300/30"
                            autoFocus={index === 0}
                          />
                        ))}
                      </div>
                      <div className="text-center text-sm text-white/70">
                        {countdown > 0 ? (
                          <p>Resend OTP in {countdown}s</p>
                        ) : (
                          <button
                            type="button"
                            onClick={sendOtp}
                            className="text-emerald-300 hover:underline"
                            disabled={isLoading}
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white h-12 font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 mt-2"
                    disabled={isLoading || isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : isOtpSent ? (
                      'Verify & Sign Up'
                    ) : (
                      'Send OTP & Continue'
                    )}
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