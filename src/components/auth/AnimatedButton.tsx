import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  loading,
  success,
  error,
  onClick,
  type = 'button',
  disabled,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200
        ${success ? 'bg-emerald-500 text-white' : error ? 'bg-red-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}
        disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      aria-busy={loading}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
            <Loader2 className="h-5 w-5 animate-spin" />
          </motion.span>
        ) : success ? (
          <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
            <CheckCircle className="h-5 w-5 text-white" />
          </motion.span>
        ) : error ? (
          <motion.span key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
            <XCircle className="h-5 w-5 text-white" />
          </motion.span>
        ) : null}
      </AnimatePresence>
      <span className="ml-1">{children}</span>
    </button>
  );
};

export default AnimatedButton; 