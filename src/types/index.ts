import { Request } from 'express';
import { Document, ObjectId } from 'mongoose';

// User Types
export interface IUser extends Document {
  _id: ObjectId;
  email?: string;
  mobile?: string;
  password: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  emailVerificationToken?: string;
  mobileVerificationToken?: string;
  emailVerificationExpires?: Date;
  mobileVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  loginAttempts: number;
  lockUntil?: Date;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Auth Types
export interface ILoginRequest {
  identifier: string; // email or mobile
  password: string;
}

export interface IRegisterRequest {
  email?: string;
  mobile?: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: Partial<IUser>;
    token: string;
    refreshToken: string;
  };
}

export interface IJWTPayload {
  userId: string;
  email?: string;
  mobile?: string;
  role: string;
}

// Request Types
export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// API Response Types
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Validation Types
export interface IValidationError {
  field: string;
  message: string;
}

// Pagination Types
export interface IPaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}