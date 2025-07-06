import React from 'react';
import { motion } from 'framer-motion';

type AuthCardProps = {
  children: React.ReactNode;
};

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl bg-white/60 backdrop-blur-lg border border-white/30 p-8 overflow-hidden"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0" style={{
        background: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.15) 100%)',
        boxShadow: '0 4px 24px 0 rgba(16,185,129,0.10)',
      }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default AuthCard; 