import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm border ${
        type === 'success' 
          ? 'bg-green-50/90 dark:bg-green-900/90 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200'
          : 'bg-red-50/90 dark:bg-red-900/90 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        )}
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-1 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;