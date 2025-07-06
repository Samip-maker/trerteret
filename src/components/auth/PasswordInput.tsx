import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  error?: string | null;
  success?: boolean;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, disabled, error, success, placeholder }) => {
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState(false);

  // Optional: Password strength (very basic)
  const getStrength = (val: string) => {
    if (val.length < 6) return 'weak';
    if (val.match(/[A-Z]/) && val.match(/[0-9]/) && val.length >= 8) return 'strong';
    return 'medium';
  };
  const strength = value ? getStrength(value) : null;

  return (
    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={show ? 'text' : 'password'}
          autoComplete="new-password"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors duration-200 pr-12
            ${error ? 'border-red-400 focus:border-red-500' : success ? 'border-emerald-400 focus:border-emerald-500' : 'border-gray-300 focus:border-emerald-400'}`}
          value={value}
          onChange={e => { onChange(e.target.value); setTouched(true); }}
          disabled={disabled}
          placeholder={placeholder || 'Password'}
          aria-invalid={!!error}
          aria-describedby={error ? 'password-error' : undefined}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 focus:outline-none"
          onClick={() => setShow(s => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <AnimatePresence mode="wait">
            {show ? (
              <motion.span key="eyeoff" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <EyeOff className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="eye" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <Eye className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.span key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <XCircle className="text-red-400 h-5 w-5" />
              </motion.span>
            ) : success ? (
              <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <CheckCircle className="text-emerald-500 h-5 w-5" />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      {/* Password strength indicator */}
      {touched && value && (
        <div className="flex items-center gap-2 mt-1">
          <div className={`h-2 w-2 rounded-full ${strength === 'weak' ? 'bg-red-400' : strength === 'medium' ? 'bg-yellow-400' : 'bg-emerald-500'}`}></div>
          <span className={`text-xs ${strength === 'weak' ? 'text-red-400' : strength === 'medium' ? 'text-yellow-500' : 'text-emerald-500'}`}>{strength}</span>
        </div>
      )}
      {error && (
        <motion.div
          id="password-error"
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

export default PasswordInput; 