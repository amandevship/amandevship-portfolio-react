import React, { useState } from 'react';
import { ResponsiveLoginForm } from './auth/ResponsiveLoginForm';
import { SignupForm } from './auth/SignupForm';
import { AdminLayout } from './layout/AdminLayout';
import { Dashboard } from './dashboard/Dashboard';
import type { User } from '../../types/auth';

export function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'Aman Sharma',
        email: credentials.email || 'admin@amandevship.com',
        role: 'admin',
        lastLogin: new Date(),
      };
      
      setUser(mockUser);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'Aman Sharma',
        email: `admin@${provider}.com`,
        role: 'admin',
        lastLogin: new Date(),
      };
      
      setUser(mockUser);
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate biometric login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: '1',
        name: 'Aman Sharma',
        email: 'admin@biometric.com',
        role: 'admin',
        lastLogin: new Date(),
      };
      
      setUser(mockUser);
    } catch (err) {
      setError('Biometric authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setError(null);
  };

  const handleSignup = async (signupData: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Signup data:', signupData);
      
      // After successful signup, switch to login
      setShowSignup(false);
      setError('Account created successfully! Please sign in.');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-space-darker text-text-primary">
        <div className="bg-stars" />
        {showSignup ? (
          <SignupForm
            onSubmit={handleSignup}
            isLoading={isLoading}
            error={error}
            onSwitchToLogin={() => setShowSignup(false)}
          />
        ) : (
          <ResponsiveLoginForm
            onSubmit={handleLogin}
            onSocialLogin={handleSocialLogin}
            onBiometricLogin={handleBiometricLogin}
            isLoading={isLoading}
            error={error}
            onSwitchToSignup={() => setShowSignup(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-darker text-text-primary">
      <div className="bg-stars" />
      <AdminLayout user={user} onLogout={handleLogout}>
        <Dashboard />
      </AdminLayout>
    </div>
  );
}
