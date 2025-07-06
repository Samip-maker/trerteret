import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface MessageDisplayProps {
  message: string | null;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

const icons = {
  success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    if (!message || onClose) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={type + message}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md mt-2 text-sm font-medium
            ${type === 'success' ? 'bg-emerald-50 text-emerald-700' : type === 'error' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}
          role={type === 'error' ? 'alert' : 'status'}
        >
          {icons[type]}
          <span>{message}</span>
          {onClose && (
            <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-700 focus:outline-none" aria-label="Close">
              <XCircle className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageDisplay; 