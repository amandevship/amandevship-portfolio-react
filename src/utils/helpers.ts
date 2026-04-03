import crypto from 'crypto';

// Generate random token
export const generateToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate secure random string for tokens
export const generateSecureToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash token for storage
export const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Generate OTP (One Time Password)
export const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate mobile format (international)
export const isValidMobile = (mobile: string): boolean => {
  const mobileRegex = /^\+?[1-9]\d{1,14}$/;
  return mobileRegex.test(mobile);
};

// Sanitize string input
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Format user data for response (remove sensitive info)
export const formatUserResponse = (user: any) => {
  const { password, emailVerificationToken, mobileVerificationToken, ...userData } = user.toObject();
  return userData;
};

// Calculate pagination info
export const getPaginationInfo = (page: number, limit: number, total: number) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev
  };
};

// Sleep utility for development/testing
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};