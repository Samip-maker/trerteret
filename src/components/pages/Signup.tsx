"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Sparkles, Shield, Zap, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Index = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Validation states
  const [validation, setValidation] = useState({
    email: { isValid: false, message: "" },
    phone: { isValid: false, message: "" },
    password: { isValid: false, message: "" },
    confirmPassword: { isValid: false, message: "" }
  });

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { isValid: false, message: "" };
    if (!emailRegex.test(email)) return { isValid: false, message: "Please enter a valid email address" };
    return { isValid: true, message: "Email looks good!" };
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phone) return { isValid: false, message: "" };
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) return { isValid: false, message: "Please enter a valid phone number" };
    return { isValid: true, message: "Phone number looks good!" };
  };

  const validatePassword = (password: string) => {
    if (!password) return { isValid: false, message: "" };
    if (password.length < 6) return { isValid: false, message: "Password must be at least 6 characters" };
    if (!/(?=.*[a-z])/.test(password)) return { isValid: false, message: "Password must contain at least one lowercase letter" };
    if (!/(?=.*[A-Z])/.test(password)) return { isValid: false, message: "Password must contain at least one uppercase letter" };
    if (!/(?=.*\d)/.test(password)) return { isValid: false, message: "Password must contain at least one number" };
    return { isValid: true, message: "Password is strong!" };
  };

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) return { isValid: false, message: "" };
    if (confirmPassword !== password) return { isValid: false, message: "Passwords do not match" };
    return { isValid: true, message: "Passwords match!" };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Live validation
    switch (name) {
      case 'email':
        setValidation(prev => ({
          ...prev,
          email: validateEmail(value)
        }));
        break;
      case 'phone':
        setValidation(prev => ({
          ...prev,
          phone: validatePhone(value)
        }));
        break;
      case 'password':
        setValidation(prev => ({
          ...prev,
          password: validatePassword(value),
          confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
        }));
        break;
      case 'confirmPassword':
        setValidation(prev => ({
          ...prev,
          confirmPassword: validateConfirmPassword(value, formData.password)
        }));
        break;
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if all validations pass
    const isFormValid = validation.email.isValid && 
                       validation.phone.isValid && 
                       validation.password.isValid && 
                       validation.confirmPassword.isValid;
    
    if (!isFormValid) {
      toast({
        title: "Validation Error",
        description: "Please fix the validation errors before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Account Created!",
        description: "Welcome! Your account has been successfully created.",
      });
      
    } catch (err) {
      console.error("Signup error:", err);
      
      toast({
        title: "Signup failed",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const FloatingLabelInput = ({ 
    id, 
    name, 
    type, 
    value, 
    onChange, 
    label, 
    icon: Icon, 
    validation,
    showToggle,
    onToggle 
  }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    
    return (
      <div className="relative group">
        <div className="relative">
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300 z-10" />
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required
            className={`
              pl-12 ${showToggle ? 'pr-12' : 'pr-4'} h-14 rounded-xl border-2 transition-all duration-300 
              bg-white/80 backdrop-blur-sm text-slate-700 text-base peer
              focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
              ${value && validation && (validation.isValid ? 'border-emerald-400 bg-emerald-50/50' : 'border-red-400 bg-red-50/50')}
              ${!value && !isFocused ? 'border-slate-200' : ''}
            `}
          />
          <Label 
            htmlFor={id} 
            className={`
              absolute left-12 transition-all duration-300 pointer-events-none font-medium
              ${value || isFocused 
                ? '-translate-y-6 translate-x-[-12px] text-sm bg-white px-2 rounded-md' 
                : 'top-1/2 -translate-y-1/2 text-base'
              }
              ${isFocused ? 'text-blue-600' : 'text-slate-500'}
              ${value && validation && validation.isValid ? 'text-emerald-600' : ''}
              ${value && validation && !validation.isValid ? 'text-red-600' : ''}
            `}
          >
            {label}
          </Label>
          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors duration-300 z-10"
            >
              {showToggle === 'password' ? (
                type === 'password' ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />
              ) : null}
            </button>
          )}
          
          {/* Validation Message */}
          <AnimatePresence>
            {value && validation && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute -bottom-6 left-0 text-xs font-medium flex items-center gap-1 ${
                  validation.isValid ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {validation.isValid ? (
                  <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                ) : (
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                )}
                {validation.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex h-full">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-sm">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <motion.div 
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">
                Join Us Today
              </h1>
              <p className="text-slate-600 text-sm">
                Create your account and start your journey
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20"
            >
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingLabelInput
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    label="Full Name"
                    icon={User}
                  />
                  
                  <FloatingLabelInput
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    label="Email Address"
                    icon={Mail}
                    validation={validation.email}
                  />
                </div>

                {/* Phone - Full Width */}
                <FloatingLabelInput
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  label="Phone Number"
                  icon={Phone}
                  validation={validation.phone}
                />

                {/* Security */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingLabelInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    label="Password"
                    icon={Lock}
                    validation={validation.password}
                    showToggle="password"
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                  
                  <FloatingLabelInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    label="Confirm Password"
                    icon={Lock}
                    validation={validation.confirmPassword}
                    showToggle="password"
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>

                {/* Terms */}
                <motion.div 
                  className="flex items-start space-x-2 pt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <Label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">
                      Privacy Policy
                    </a>
                  </Label>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 text-sm"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Create Account</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Sign In Link */}
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-slate-600 text-sm">Already have an account? </span>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold underline text-sm">
                  Sign in
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-8"
        >
          <div className="text-center space-y-6">
            {/* Main Illustration */}
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-3xl absolute inset-0" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/30">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Shield className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -10 }}
                  >
                    <Zap className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Heart className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  Welcome to Our Community
                </h3>
                <p className="text-slate-600 text-sm">
                  Join thousands of users who trust us with their journey
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { number: "10K+", label: "Users" },
                { number: "99%", label: "Satisfied" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-lg font-bold text-slate-800">{stat.number}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
