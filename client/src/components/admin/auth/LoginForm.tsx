import React, { useState } from 'react';
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
  Smartphone
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { LoginCredentials } from '../../../types/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().regex(/^\+91[\d\s-()]{10,15}$/, 'Invalid Indian phone number. Use +91 format').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  onSocialLogin: (provider: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onSocialLogin,
  isLoading = false,
  error = null,
}) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const {
    formState: { errors },
  } = useForm({
    resolver: zodResolver(showOtpInput ? otpSchema : loginSchema),
  });

  const emailForm = useForm({ resolver: zodResolver(loginSchema) });
  const phoneForm = useForm({ resolver: zodResolver(loginSchema) });
  const otpForm = useForm({ resolver: zodResolver(otpSchema) });

  const handleEmailLogin = (data: any) => {
    if (showOtpInput) {
      onSubmit({ email: emailForm.getValues('email'), otp: data.otp });
    } else {
      onSubmit({ email: data.email, password: data.password });
    }
  };

  const handlePhoneLogin = (data: any) => {
    if (showOtpInput) {
      onSubmit({ phone: phoneNumber, otp: data.otp });
    } else {
      setPhoneNumber(data.phone);
      setShowOtpInput(true);
    }
  };

  const handleSendOtp = () => {
    // In a real app, this would send OTP to the phone/email
    setShowOtpInput(true);
  };

  const handleBackToLogin = () => {
    setShowOtpInput(false);
    phoneForm.reset();
    otpForm.reset();
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'https://www.google.com/favicon.ico',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'https://www.facebook.com/favicon.ico',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'https://www.apple.com/favicon.ico',
      color: 'bg-gray-800 hover:bg-gray-900',
    },
  ];

  return (
    <div className="min-h-screen bg-space-darker flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-darker via-space-dark to-space-darker" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Login Card */}
        <div className="bg-space-dark/80 backdrop-blur-xl border border-neon-cyan/20 rounded-2xl p-8 shadow-glow-cyan">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-cyan to-flame flex items-center justify-center overflow-hidden"
            >
              <img 
                src="/images/profile.png" 
                alt="Aman DevShip" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Admin Portal
            </h1>
            <p className="text-text-secondary text-sm">
              Manage your portfolio content
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Method Toggle */}
          {!showOtpInput && (
            <div className="flex mb-6 bg-space-card/50 rounded-lg p-1">
              <button
                onClick={() => setLoginMethod('email')}
                className={cn(
                  'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
                  loginMethod === 'email'
                    ? 'bg-neon-cyan text-space-darker'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
              <button
                onClick={() => setLoginMethod('phone')}
                className={cn(
                  'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
                  loginMethod === 'phone'
                    ? 'bg-neon-cyan text-space-darker'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                <Smartphone className="w-4 h-4 inline mr-2" />
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
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input
                      {...emailForm.register('email')}
                      type="email"
                      placeholder="admin@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                    />
                  </div>
                  {emailForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input
                      {...emailForm.register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {emailForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {emailForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-text-secondary">
                    <input type="checkbox" className="mr-2 rounded border-neon-cyan/20 bg-space-card/50" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm text-neon-cyan hover:text-neon-cyan/80">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-neon-cyan to-flame text-space-darker font-semibold rounded-lg hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-space-darker border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
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
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Indian Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input
                      {...phoneForm.register('phone')}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                    />
                  </div>
                  {phoneForm.formState.errors.phone && (
                    <p className="mt-1 text-sm text-red-400">
                      {phoneForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-neon-cyan to-flame text-space-darker font-semibold rounded-lg hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-space-darker border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send OTP
                      <Smartphone className="w-4 h-4 ml-2" />
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
                className="space-y-4"
              >
                <button
                  onClick={handleBackToLogin}
                  className="flex items-center text-text-secondary hover:text-text-primary text-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to login
                </button>

                <div className="text-center">
                  <p className="text-text-secondary mb-4">
                    Enter the 6-digit code sent to {loginMethod === 'email' ? emailForm.getValues('email') : phoneNumber}
                  </p>
                </div>

                <form onSubmit={otpForm.handleSubmit(handleEmailLogin)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Verification Code
                    </label>
                    <div className="flex justify-center space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          {...otpForm.register('otp')}
                          type="text"
                          maxLength={1}
                          className="w-12 h-12 text-center bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary text-xl font-bold focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                        />
                      ))}
                    </div>
                    {otpForm.formState.errors.otp && (
                      <p className="mt-1 text-sm text-red-400 text-center">
                        {otpForm.formState.errors.otp.message}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all',
                        loginMethod === 'phone'
                          ? 'bg-neon-cyan text-space-darker'
                          : 'bg-neon-cyan text-space-darker'
                      )}
                    >
                      Resend Code
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        'flex-1 py-3 bg-gradient-to-r from-neon-cyan to-flame text-space-darker font-semibold rounded-lg hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed',
                        loginMethod === 'phone'
                          ? 'bg-gradient-to-r from-neon-cyan to-flame'
                          : 'bg-gradient-to-r from-neon-cyan to-flame'
                      )}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-space-darker border-t-transparent rounded-full animate-spin mx-auto" />
                      ) : (
                          'Verify'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neon-cyan/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-space-dark text-text-secondary">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {socialProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => onSocialLogin(provider.id)}
                  className="flex items-center justify-center py-2 px-4 bg-space-card/50 border border-neon-cyan/20 rounded-lg hover:bg-space-card transition-all group"
                >
                  <img
                    src={provider.icon}
                    alt={provider.name}
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary">
                    {provider.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-text-secondary text-sm">
            Protected by enterprise-grade security
          </p>
        </div>
      </motion.div>
    </div>
  );
};
