import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../../lib/utils';

interface OTPTimerProps {
  initialTime?: number; // in seconds
  onTimeUp?: () => void;
  onResend?: () => void;
  isResending?: boolean;
  className?: string;
  autoStart?: boolean;
}

export const OTPTimer: React.FC<OTPTimerProps> = ({
  initialTime = 60,
  onTimeUp,
  onResend,
  isResending = false,
  className,
  autoStart = false
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);

  // Auto-start timer when component mounts or key changes
  useEffect(() => {
    if (autoStart) {
      setTimeLeft(initialTime);
      setIsActive(true);
    }
  }, [autoStart, initialTime]);

  const handleResend = useCallback(() => {
    if (onResend && !isActive && timeLeft === 0) {
      onResend();
      setTimeLeft(initialTime);
      setIsActive(true);
    }
  }, [onResend, isActive, timeLeft, initialTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onTimeUp?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      onTimeUp?.();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onTimeUp]);

  
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {isActive ? (
        <span className="text-text-secondary text-sm">
          Resend code in <span className="font-medium text-neon-cyan">{formatTime(timeLeft)}</span>
        </span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-neon-cyan hover:text-neon-cyan/80 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? 'Sending...' : 'Resend Code'}
        </button>
      )}
    </div>
  );
};

// Export a hook for easier usage
export const useOTPTimer = (initialTime: number = 60) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(true);
  }, [initialTime]);

  const stop = useCallback(() => {
    setIsActive(false);
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  return {
    timeLeft,
    isActive,
    start,
    stop,
    canResend: !isActive && timeLeft === 0,
    formatTime: () => {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  };
};
