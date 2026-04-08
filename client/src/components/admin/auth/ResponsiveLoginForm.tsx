import React, { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { MobileLoginForm } from './MobileLoginForm';
import type { LoginCredentials } from '../../../types/auth';

interface ResponsiveLoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  onSocialLogin: (provider: string) => void;
  onBiometricLogin?: () => void;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToSignup?: () => void;
}

export const ResponsiveLoginForm: React.FC<ResponsiveLoginFormProps> = ({
  onSubmit,
  onSocialLogin,
  onBiometricLogin,
  isLoading,
  error,
  onSwitchToSignup,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <MobileLoginForm
        onSubmit={onSubmit}
        onSocialLogin={onSocialLogin}
        onBiometricLogin={onBiometricLogin}
        isLoading={isLoading}
        error={error}
        onSwitchToSignup={onSwitchToSignup}
      />
    );
  }

  return (
    <LoginForm
      onSubmit={onSubmit}
      onSocialLogin={onSocialLogin}
      isLoading={isLoading}
      error={error}
      onSwitchToSignup={onSwitchToSignup}
    />
  );
};
