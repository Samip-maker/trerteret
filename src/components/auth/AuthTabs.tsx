import React from 'react';
import { motion } from 'framer-motion';

type AuthTabsProps = {
  mode: 'sign-in' | 'sign-up';
  setMode: (mode: 'sign-in' | 'sign-up') => void;
};

const tabs = [
  { label: 'Sign In', value: 'sign-in' },
  { label: 'Sign Up', value: 'sign-up' },
];

const AuthTabs: React.FC<AuthTabsProps> = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center mb-8 relative">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`relative px-6 py-2 text-lg font-semibold focus:outline-none transition-colors duration-200 ${
            mode === tab.value
              ? 'text-emerald-600'
              : 'text-gray-400 hover:text-emerald-400'
          }`}
          aria-controls={`auth-panel-${tab.value}`}
          tabIndex={mode === tab.value ? 0 : -1}
          onClick={() => setMode(tab.value as 'sign-in' | 'sign-up')}
        >
          {tab.label}
          {mode === tab.value && (
            <motion.div
              layoutId="auth-tab-underline"
              className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-emerald-500"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs; 