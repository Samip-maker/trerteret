import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface EmailInputProps {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  error?: string | null;
  success?: boolean;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, disabled, error, success }) => {
  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!touched) return;
    setChecking(true);
    const timeout = setTimeout(() => {
      setValid(emailRegex.test(value));
      setChecking(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [value, touched]);

  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
        Email
      </label>
      <div className="relative">
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors duration-200 pr-12
            ${error ? 'border-red-400 focus:border-red-500' : valid ? 'border-emerald-400 focus:border-emerald-500' : 'border-gray-300 focus:border-emerald-400'}`}
          value={value}
          onChange={e => { onChange(e.target.value); setTouched(true); }}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? 'email-error' : undefined}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {checking ? (
              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader2 className="animate-spin text-gray-400 h-5 w-5" />
              </motion.span>
            ) : error ? (
              <motion.span key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <XCircle className="text-red-400 h-5 w-5" />
              </motion.span>
            ) : valid || success ? (
              <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <CheckCircle className="text-emerald-500 h-5 w-5" />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      {error && (
        <motion.div
          id="email-error"
          className="text-red-500 text-xs mt-1"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default EmailInput; 