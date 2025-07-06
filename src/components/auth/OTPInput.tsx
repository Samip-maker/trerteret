import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OTPInputProps {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  error?: string | null;
  success?: boolean;
  length?: number;
}

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange, disabled, error, success, length = 6 }) => {
  const inputs = Array.from({ length });
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle input change
  const handleChange = (i: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const chars = value.split("");
    chars[i] = val;
    const newValue = chars.join("").slice(0, length);
    onChange(newValue);
    if (val && i < length - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && i > 0) {
      refs.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && i < length - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pasted.length === length) {
      onChange(pasted);
      refs.current[length - 1]?.focus();
      e.preventDefault();
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1" htmlFor="otp-slot-0">
        OTP
      </label>
      <div className="flex gap-2 justify-center">
        {inputs.map((_, i) => (
          <motion.input
            key={i}
            id={`otp-slot-${i}`}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={1}
            ref={el => (refs.current[i] = el)}
            value={value[i] || ''}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            disabled={disabled}
            aria-label={`OTP digit ${i + 1}`}
            className={`w-12 h-12 text-center text-2xl font-mono rounded-lg border transition-colors duration-200 bg-white/80 focus:outline-none focus:ring-2
              ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : success ? 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-200' : 'border-gray-300 focus:border-emerald-400 focus:ring-emerald-100'}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            className="text-red-500 text-xs mt-2 text-center"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            {error}
          </motion.div>
        )}
        {success && !error && (
          <motion.div
            className="text-emerald-500 text-xs mt-2 text-center"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            OTP verified!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OTPInput; 