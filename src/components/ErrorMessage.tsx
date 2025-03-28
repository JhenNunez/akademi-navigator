
import React, { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  autoDismiss?: boolean;
  duration?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onDismiss, 
  autoDismiss = false,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, duration, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg",
      "flex items-center justify-between animate-fade-in mb-4"
    )}>
      <div className="flex items-center">
        <AlertCircle size={20} className="mr-2 flex-shrink-0" />
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button 
          onClick={() => {
            setIsVisible(false);
            onDismiss();
          }}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
