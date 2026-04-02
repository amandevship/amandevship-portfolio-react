import React, { useState } from 'react';
import { LoginForm } from './auth/LoginForm';
import { AdminLayout } from './layout/AdminLayout';
import { Dashboard } from './dashboard/Dashboard';
import type { User } from '../../types/auth';

export function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleLogout = () => {
    setUser(null);
    setError(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-space-darker text-text-primary">
        <div className="bg-stars" />
        <LoginForm
          onSubmit={handleLogin}
          onSocialLogin={handleSocialLogin}
          isLoading={isLoading}
          error={error}
        />
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
