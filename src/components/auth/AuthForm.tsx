import React, { useState } from 'react';
import AuthTabs from './AuthTabs';
import EmailInput from './EmailInput';
import OTPInput from './OTPInput';
import AnimatedButton from './AnimatedButton';
import MessageDisplay from './MessageDisplay';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const router = useRouter();

  // Email validation
  const validateEmail = (val: string) => {
    if (!val) return 'Email is required.';
    if (!/^\S+@\S+\.\S+$/.test(val)) return 'Enter a valid email address.';
    return null;
  };

  // OTP validation
  const validateOtp = (val: string) => {
    if (!val || val.length !== 6) return 'Enter the 6-digit OTP.';
    return null;
  };

  // Send OTP handler
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSuccess(false);
    setOtpSuccess(false);
    setOtp('');
    // Validate email
    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    if (emailErr) return;
    if (mode === 'sign-up' && !fullName) {
      setError('Full name is required.');
      return;
    }
    setLoading(true);
    try {
      const payload: Record<string, string> = { email };
      if (mode === 'sign-up') payload.name = fullName;
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStep('otp');
        setMessage('OTP sent to your email.');
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP handler
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSuccess(false);
    setOtpSuccess(false);
    // Validate OTP
    const otpErr = validateOtp(otp);
    setOtpError(otpErr);
    if (otpErr) return;
    setLoading(true);
    try {
      const payload: Record<string, string> = { email, otp };
      if (mode === 'sign-up') payload.name = fullName;
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSuccess(true);
        setSuccess(true);
        setMessage('OTP verified! Redirecting...');
        const role = data.user?.role || data.role || 'user';
        let redirectPath = '/';
        if (role === 'admin') redirectPath = '/admin/dashboard';
        else if (role === 'partner') redirectPath = '/partner/dashboard';
        setTimeout(() => {
          router.push(redirectPath);
        }, 1200);
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form when switching modes
  const handleTabChange = (m: 'sign-in' | 'sign-up') => {
    setMode(m);
    setStep('input');
    setEmail('');
    setFullName('');
    setOtp('');
    setError(null);
    setMessage(null);
    setSuccess(false);
    setOtpSuccess(false);
    setEmailError(null);
    setOtpError(null);
  };

  return (
    <div className="w-full">
      <AuthTabs mode={mode} setMode={handleTabChange} />
      <AnimatePresence mode="wait" initial={false}>
        {step === 'input' ? (
          <motion.form
            key="input"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="space-y-4"
            onSubmit={handleSendOtp}
            aria-label={mode === 'sign-in' ? 'Sign In Form' : 'Sign Up Form'}
          >
            {mode === 'sign-up' && (
              <div>
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 border-gray-300"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                  aria-label="Full Name"
                />
              </div>
            )}
            <EmailInput
              value={email}
              onChange={v => { setEmail(v); setEmailError(null); }}
              error={emailError}
              success={!!email && !emailError}
              disabled={loading}
            />
            <AnimatedButton type="submit" loading={loading} success={success} error={!!error}>
              Send OTP
            </AnimatedButton>
            <MessageDisplay message={error} type="error" onClose={() => setError(null)} />
            <MessageDisplay message={message} type="success" onClose={() => setMessage(null)} />
          </motion.form>
        ) : (
          <motion.form
            key="otp"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="space-y-4"
            onSubmit={handleVerifyOtp}
            aria-label="OTP Verification Form"
          >
            <OTPInput
              value={otp}
              onChange={v => { setOtp(v); setOtpError(null); }}
              error={otpError}
              success={otpSuccess}
              disabled={loading}
            />
            <AnimatedButton type="submit" loading={loading} success={success} error={!!error}>
              Verify OTP
            </AnimatedButton>
            <button
              type="button"
              className="w-full text-sm text-gray-500 hover:text-emerald-600 underline mt-2"
              onClick={() => setStep('input')}
              tabIndex={0}
            >
              &larr; Back to {mode === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </button>
            <MessageDisplay message={error} type="error" onClose={() => setError(null)} />
            <MessageDisplay message={message} type="success" onClose={() => setMessage(null)} />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthForm; 