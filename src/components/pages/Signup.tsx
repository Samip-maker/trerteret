"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Phone, Shield, Zap, Heart, Mountain, Loader2, Check, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const Index = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });
  

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  
  // Validation states
  const [validation, setValidation] = useState({
    email: { isValid: false, message: "" },
    phone: { isValid: true, message: "" }
  });

  const [step, setStep] = useState<'form' | 'success'>('form');




  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { isValid: false, message: "Email is required" };
    if (!emailRegex.test(email)) return { isValid: false, message: "Please enter a valid email address" };
    return { isValid: true, message: "" };
  };

  const validatePhone = (phone: string) => {
    if (!phone) return { isValid: true, message: "" }; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) return { isValid: false, message: "Please enter a valid phone number" };
    return { isValid: true, message: "" };
  };

  useEffect(() => {
    const emailValidation = validateEmail(formData.email);
    const phoneValidation = validatePhone(formData.phone);
    
    setValidation({
      email: emailValidation,
      phone: phoneValidation
    });
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validate the field being changed
    if (name === 'email') {
      const emailValidation = validateEmail(value);
      setValidation(prev => ({ ...prev, email: emailValidation }));
    } else if (name === 'phone') {
      const phoneValidation = validatePhone(value);
      setValidation(prev => ({ ...prev, phone: phoneValidation }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [otpStep, setOtpStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Basic validation
    if (!formData.name || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send OTP to user's email
      const otpRes = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name
        }),
      });
      
      const otpData = await otpRes.json();
      
      if (!otpData.success) {
        throw new Error(otpData.error || 'Failed to send OTP');
      }
      
      // Move to OTP verification step
      setOtpStep('otp');
      setSuccess('OTP sent to your email! Please check your inbox.');
      
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOtpError(null);
    
    if (!otp) {
      setOtpError('Please enter the OTP');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Verify OTP
      const verifyRes = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: otp
        }),
      });
      
      const verifyData = await verifyRes.json();
      
      if (!verifyData.success) {
        throw new Error(verifyData.error || 'Invalid OTP');
      }
      
      // OTP verified, create user account
      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          role: 'user'
        }),
      });
      
      const signupData = await signupRes.json();
      
      if (!signupData.success) {
        throw new Error(signupData.message || 'Failed to create account');
      }
      
      // Registration successful
      setStep('success');
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Error during OTP verification:', err);
      setOtpError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Sikkim Trails</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join our community and start your journey
            </p>
          </div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8"
          >
            <form onSubmit={otpStep === 'otp' ? handleOtpVerification : handleSignup} className="space-y-6">
              {error && <div className="text-red-600 text-sm font-medium text-center p-2 bg-red-50 rounded-md">{error}</div>}
              {otpError && <div className="text-red-600 text-sm font-medium text-center p-2 bg-red-50 rounded-md">{otpError}</div>}
              {success && <div className="text-emerald-600 text-sm font-medium text-center p-2 bg-emerald-50 rounded-md">{success}</div>}
              
              {otpStep === 'form' ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </div>
              ) : otpStep === 'otp' ? (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-medium">Verify Your Email</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We've sent a 6-digit code to {formData.email}
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="otp">Enter OTP Code</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="pl-10"
                        placeholder="123456"
                        maxLength={6}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpStep('form');
                        setOtp('');
                        setOtpError(null);
                        setSuccess(null);
                      }}
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      Back to form
                    </button>
                  </div>
                </div>
              ) : (
                // Success state
                <div className="text-center space-y-6 py-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Account Created Successfully!</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      Your account has been created. You'll be redirected to login shortly...
                    </p>
                  </div>
                  <Button
                    onClick={() => router.push('/login')}
                    className="w-full"
                  >
                    Go to Login Now
                  </Button>
                </div>
              )}
            </form>

            {/* Already have an account? */}
            {otpStep === 'form' && (
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <a 
                    href="/login" 
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full blur-lg"
          />
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-md"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-8 max-w-md"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-center space-x-3 mb-8"
            >
              <div className="relative">
                <Mountain className="h-12 w-12 text-white" />
                <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Sikkim Trails</h1>
                <p className="text-sm text-emerald-100">Mystic Splendor</p>
              </div>
            </motion.div>

            {/* Hero Text */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight">
                Join Our
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Adventure
                </span>
              </h2>
              <p className="text-lg text-emerald-100 leading-relaxed">
                Create your account and start exploring the mystical landscapes of Sikkim with our curated travel experiences.
              </p>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-emerald-200" />
                <span className="text-emerald-100">Secure & Protected</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-emerald-200" />
                <span className="text-emerald-100">Instant Access</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-emerald-200" />
                <span className="text-emerald-100">Personalized Experience</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-emerald-200">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-emerald-200">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-emerald-200">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
