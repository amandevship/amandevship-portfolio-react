import React from 'react';
import { SignupForm } from '../components/admin/auth/SignupForm';

const SignupPage: React.FC = () => {
  const handleSignup = (data: any) => {
    console.log('Signup data:', data);
    // Here you would typically make an API call to register the user
    alert('Registration successful! Check console for data.');
  };

  return (
    <SignupForm 
      onSubmit={handleSignup}
      isLoading={false}
      error={null}
    />
  );
};

export default SignupPage;
