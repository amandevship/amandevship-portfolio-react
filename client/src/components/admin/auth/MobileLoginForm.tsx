import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ChevronLeft,
  Smartphone,
  Shield,
  Fingerprint,
  User
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { LoginCredentials } from '../../../types/auth';

const phoneLoginSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

const emailLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

interface MobileLoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  onSocialLogin: (provider: string) => void;
  onBiometricLogin?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const MobileLoginForm: React.FC<MobileLoginFormProps> = ({
  onSubmit,
  onSocialLogin,
  onBiometricLogin,
  isLoading = false,
  error = null,
}) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const emailForm = useForm({ resolver: zodResolver(emailLoginSchema) });
  const phoneForm = useForm({ resolver: zodResolver(phoneLoginSchema) });
  const otpForm = useForm({ resolver: zodResolver(otpSchema) });

  const handleEmailLogin = (data: any) => {
    if (showOtpInput) {
      onSubmit({ email: emailForm.getValues('email'), otp: otpValues.join('') });
    } else {
      onSubmit({ email: data.email, password: data.password });
    }
  };

  const handlePhoneLogin = async (data: any) => {
    console.log('Mobile handlePhoneLogin called with data:', data);
    console.log('Mobile showOtpInput:', showOtpInput);
    
    if (showOtpInput) {
      onSubmit({ phone: phoneNumber, otp: otpValues.join('') });
    } else {
      setPhoneNumber(data.phone);
      
      // Simulate sending OTP with loading
      try {
        console.log('Starting mobile OTP sending process...');
        // Here you would typically make an API call to send OTP
        // await sendOtpApi(data.phone);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll just show OTP input
        setOtpSent(true);
        setShowOtpInput(true);
        
        // Reset OTP sent message after 3 seconds
        setTimeout(() => setOtpSent(false), 3000);
        
        console.log(`Mobile OTP sent to ${data.phone}`);
      } catch (error) {
        console.error('Failed to send mobile OTP:', error);
        // Handle error - show error message to user
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackToLogin = () => {
    setShowOtpInput(false);
    setOtpSent(false);
    setOtpValues(['', '', '', '', '', '']);
    phoneForm.reset();
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z',
      color: 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50',
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'M17.05 20.28c-.98.95-2.05.8-3.08.35-1.03-.42-2.19-.36-5.05-1.65-6.28-.72-.7-1.48-.98-2.29-.98-.82 0-1.61.28-2.34.98-1.29 1.23-1.63 4.09-1.65 6.28-1.03.45-2.1.6-3.08-.35-.98-.95-1.56-2.48-1.56-4.19 0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.71-.58 3.24-1.56 4.19z',
      color: 'bg-black text-white hover:bg-gray-900',
    },
    {
      id: 'biometric',
      name: 'Biometric',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
    },
  ];

  useEffect(() => {
    if (showOtpInput) {
      inputRefs.current[0]?.focus();
    }
  }, [showOtpInput]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-darker via-space-dark to-space-darker flex flex-col">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <div className="w-8" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-cyan to-flame flex items-center justify-center overflow-hidden shadow-lg"
        >
          <User className="w-6 h-6 text-white" />
        </motion.div>
        <div className="w-8" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary text-base">
              Sign in to manage your portfolio
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* OTP Sent Success Message */}
          <AnimatePresence>
            {otpSent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm mobile-success"
              >
                ✓ OTP sent successfully to your phone number
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Method Toggle */}
          {!showOtpInput && (
            <div className="flex mb-6 bg-space-card rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setLoginMethod('email')}
                className={cn(
                  'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center',
                  loginMethod === 'email'
                    ? 'bg-neon-cyan text-space-darker shadow-md'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </button>
              <button
                onClick={() => setLoginMethod('phone')}
                className={cn(
                  'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center',
                  loginMethod === 'phone'
                    ? 'bg-neon-cyan text-space-darker shadow-md'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Phone
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {loginMethod === 'email' && !showOtpInput && (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={emailForm.handleSubmit(handleEmailLogin)}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      {...emailForm.register('email')}
                      type="email"
                      placeholder="admin@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-space-card border border-neon-cyan/20 rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 text-base"
                      autoComplete="email"
                    />
                  </div>
                  {emailForm.formState.errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      {...emailForm.register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-14 py-4 bg-space-card border border-neon-cyan/20 rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 text-base"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-1"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {emailForm.formState.errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {emailForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-text-secondary">
                    <input type="checkbox" className="mr-3 rounded border-neon-cyan/20 bg-space-card w-4 h-4" />
                    Remember me
                  </label>
                  <button type="button" className="text-sm text-neon-cyan hover:text-neon-cyan/80 font-medium">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-neon-cyan to-flame text-space-darker font-semibold rounded-xl hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-space-darker border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {loginMethod === 'phone' && !showOtpInput && (
              <motion.form
                key="phone-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={phoneForm.handleSubmit(handlePhoneLogin)}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      {...phoneForm.register('phone')}
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full pl-12 pr-4 py-4 bg-space-card border border-neon-cyan/20 rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 text-base"
                      autoComplete="tel"
                    />
                  </div>
                  {phoneForm.formState.errors.phone && (
                    <p className="mt-2 text-sm text-red-400">
                      {phoneForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-neon-cyan to-flame text-space-darker font-semibold rounded-xl hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-space-darker border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send OTP
                      <Smartphone className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {showOtpInput && (
              <motion.div
                key="otp-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button
                  onClick={handleBackToLogin}
                  className="flex items-center text-text-secondary hover:text-text-primary text-sm font-medium"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back to login
                </button>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-cyan to-flame flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Verify your {loginMethod === 'email' ? 'email' : 'phone'}
                  </h2>
                  <p className="text-text-secondary text-base">
                    Enter the 6-digit code sent to {loginMethod === 'email' ? emailForm.getValues('email') : phoneNumber}
                  </p>
                </div>

                <div className="flex justify-center space-x-3">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-14 h-14 text-center bg-space-card border border-neon-cyan/20 rounded-xl text-text-primary text-2xl font-bold focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                    />
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => {
                      setOtpValues(['', '', '', '', '', '']);
                      inputRefs.current[0]?.focus();
                    }}
                    className="w-full py-3 px-4 rounded-xl text-sm font-medium text-neon-cyan bg-space-card border border-neon-cyan/20 hover:bg-space-card/80 transition-all"
                  >
                    Clear Code
                  </button>
                  
                  <button
                    onClick={() => handleEmailLogin({ otp: otpValues.join('') })}
                    disabled={isLoading || otpValues.some(v => !v)}
                    className="w-full py-4 bg-gradient-to-r from-neon-cyan to-flame text-space-darker font-semibold rounded-xl hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base shadow-lg"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-space-darker border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Verify & Continue'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Login */}
          {!showOtpInput && (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neon-cyan/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-space-dark text-text-secondary">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {socialProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => provider.id === 'biometric' ? onBiometricLogin?.() : onSocialLogin(provider.id)}
                    className={cn(
                      'w-full py-4 px-4 rounded-xl font-medium transition-all flex items-center justify-center text-base shadow-md',
                      provider.color
                    )}
                  >
                    {provider.id === 'biometric' ? (
                      <Fingerprint className="w-5 h-5 mr-3" />
                    ) : (
                      <div className="w-5 h-5 mr-3" dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${provider.icon}"/></svg>` }} />
                    )}
                    {provider.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Security Badge */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-center text-text-secondary text-sm">
          <Shield className="w-4 h-4 mr-2" />
          Protected by enterprise-grade security
        </div>
      </div>
    </div>
  );
};
