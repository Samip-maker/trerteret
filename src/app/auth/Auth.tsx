"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    otp: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = isValidEmail(formData.email);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setFormData({ fullName: '', email: '', otp: '', confirmPassword: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignIn ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-gray-600">
            {isSignIn 
              ? 'Sign in to continue your journey' 
              : 'Join us and start exploring amazing destinations'
            }
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setIsSignIn(true)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isSignIn 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              !isSignIn 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sign Up Only - Full Name */}
            {!isSignIn && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 transition-all duration-200"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-12 pr-12 h-12 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-4 transition-all duration-200 ${
                    formData.email.length > 0
                      ? isEmailValid
                        ? 'border-emerald-300 focus:border-emerald-300 focus:ring-emerald-50'
                        : 'border-red-300 focus:border-red-300 focus:ring-red-50'
                      : 'focus:border-emerald-300 focus:ring-emerald-50'
                  }`}
                  required
                />
                {formData.email.length > 0 && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {isEmailValid ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {formData.email.length > 0 && !isEmailValid && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* OTP - Only show when email is valid */}
            {isEmailValid && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                <Label className="text-sm font-semibold text-gray-700">
                  Verification Code
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={formData.otp}
                    onChange={(value) => handleInputChange('otp', value)}
                  >
                    <InputOTPGroup className="gap-3">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="h-14 w-12 text-xl font-semibold border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 bg-gray-50 focus:bg-white transition-all duration-200"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !isEmailValid}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isSignIn ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {isSignIn ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>

            {/* Additional Options */}
            {isSignIn && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={handleToggle}
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
            >
              {isSignIn ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <span>Secure authentication with OTP verification</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <span>Access to exclusive travel packages</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <span>Personalized recommendations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
