"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth, type Role, type SignUpCredentials } from "@/contexts/AuthContext";

interface FormData extends Omit<SignUpCredentials, 'redirectTo'> {
  confirmPassword: string;
}

const Signup = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { signUp } = useAuth();
  const from = searchParams.get("from") || "/";
  const role = (searchParams.get("role") as Role | undefined) || "user";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: role,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Prepare the signup data with proper types
      const signUpData: SignUpCredentials = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone?.trim(),
        role: role,
        redirectTo: from,
        rememberMe: false
      };
      
      // Call the signup function from the auth context
      await signUp(signUpData);
      
      // Show success message (handled by auth context)
    } catch (err) {
      console.error("Signup error:", err);
      
      // Handle error with proper type checking
      const errorMessage = err instanceof Error ? err.message : "An error occurred during signup";
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/70 to-green-900/80" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-float" />
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-green-500/20 rounded-full blur-md animate-float" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      {/* Left Side - Signup Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 flex items-center justify-center p-6 relative z-10"
      >
        <div className="w-full max-w-lg space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-purple-400 mr-2 animate-pulse" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Join Us
              </h1>
            </div>
            <p className="text-gray-200">
              Start your incredible journey today
            </p>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-morphism rounded-3xl p-6 shadow-2xl border border-white/20"
          >
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-10 rounded-xl border-white/20 focus:border-purple-400 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-10 rounded-xl border-white/20 focus:border-purple-400 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="relative group">
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="pl-10 h-10 rounded-xl border-white/20 focus:border-purple-400 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10 pr-10 h-10 rounded-xl border-white/20 focus:border-purple-400 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="relative group">
                  <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                    Confirm
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="pl-10 pr-10 h-10 rounded-xl border-white/20 focus:border-purple-400 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="terms" className="text-xs text-gray-300">
                  I agree to the{" "}
                  <Link href="/terms" className="text-purple-400 hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-400 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-4 text-center">
              <span className="text-gray-300">Already have an account? </span>
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign in →
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Content Banner */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center items-center text-white p-12 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h2 className="text-5xl font-bold leading-tight">
              Start Your
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Adventure
              </span>
            </h2>
            <p className="text-xl text-purple-100 max-w-md">
              Join thousands of travelers discovering hidden gems in the Himalayas
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-3 gap-3 text-center"
          >
            <div className="glass-morphism rounded-xl p-3 hover-lift-3d">
              <div className="text-xl font-bold">200+</div>
              <div className="text-xs text-purple-200">Partners</div>
            </div>
            <div className="glass-morphism rounded-xl p-3 hover-lift-3d">
              <div className="text-xl font-bold">50+</div>
              <div className="text-xs text-purple-200">Places</div>
            </div>
            <div className="glass-morphism rounded-xl p-3 hover-lift-3d">
              <div className="text-xl font-bold">99%</div>
              <div className="text-xs text-purple-200">Satisfied</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;