import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToLogin?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  isLoading = false,
  error = null,
  onSwitchToLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = (data: SignupFormData) => {
    onSubmit(data);
  };

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
        {/* Signup Card */}
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
              Admin Registration
            </h1>
            <p className="text-text-secondary text-sm">
              Create your admin account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    {...register('firstName')}
                    type="text"
                    placeholder="John"
                    className="w-full pl-10 pr-4 py-3 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    {...register('lastName')}
                    type="text"
                    placeholder="Doe"
                    className="w-full pl-10 pr-4 py-3 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  {...register('mobile')}
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-3 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                />
              </div>
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  {...register('password')}
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-2 rounded border-neon-cyan/20 bg-space-card/50"
              />
              <label htmlFor="terms" className="text-sm text-text-secondary">
                I agree to the{' '}
                <a href="#" className="text-neon-cyan hover:text-neon-cyan/80">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-neon-cyan hover:text-neon-cyan/80">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-neon-cyan to-flame text-space-darker font-semibold rounded-lg hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-space-darker border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              Already have an account?{' '}
              <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-neon-cyan hover:text-neon-cyan/80 font-medium bg-transparent border-none cursor-pointer"
            >
              Sign In
            </button>
            </p>
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
