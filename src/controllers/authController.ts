import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import User from '../models/User';
import { ILoginRequest, IRegisterRequest, IAuthResponse, AuthenticatedRequest } from '../types';

export class AuthController {
  // Generate JWT token
  private generateToken(userId: string | ObjectId): string {
    const secret: string = process.env.JWT_SECRET || 'fallback_secret';
    return (jwt.sign as any)({ userId: userId.toString() }, secret, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
  }

  // Generate refresh token
  private generateRefreshToken(userId: string | ObjectId): string {
    const secret: string = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret';
    return (jwt.sign as any)({ userId: userId.toString() }, secret, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
    });
  }

  // Login with email or mobile
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { identifier, password }: ILoginRequest = req.body;

      // Validate input
      if (!identifier || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide identifier (email/mobile) and password'
        } as IAuthResponse);
      }

      // Find user by email or mobile
      const user = await (User as any).findByIdentifier(identifier, '+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        } as IAuthResponse);
      }

      // Check if account is locked
      if ((user as any).isLocked) {
        return res.status(423).json({
          success: false,
          message: 'Account is temporarily locked due to too many failed login attempts'
        } as IAuthResponse);
      }

      // Check password
      const isPasswordValid = await (user as any).comparePassword(password);

      if (!isPasswordValid) {
        // Increment login attempts
        await (user as any).incLoginAttempts();

        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        } as IAuthResponse);
      }

      // Reset login attempts on successful login
      await (user as any).resetLoginAttempts();

      // Generate tokens
      const token = this.generateToken(user._id);
      const refreshToken = this.generateRefreshToken(user._id);

      // Prepare user data (exclude sensitive information)
      const userData = {
        _id: user._id,
        email: user.email,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
        isMobileVerified: user.isMobileVerified,
        role: user.role,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      };

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: userData,
          token,
          refreshToken
        }
      } as IAuthResponse);

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as IAuthResponse);
    }
  }

  // Register new user
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, mobile, password, firstName, lastName }: IRegisterRequest = req.body;

      // Validate that at least one identifier is provided
      if (!email && !mobile) {
        return res.status(400).json({
          success: false,
          message: 'Please provide either email or mobile number'
        } as IAuthResponse);
      }

      // Check if user already exists
      if (email) {
        const existingEmailUser = await User.findOne({ email: email.toLowerCase() });
        if (existingEmailUser) {
          return res.status(409).json({
            success: false,
            message: 'Email already registered'
          } as IAuthResponse);
        }
      }

      if (mobile) {
        const existingMobileUser = await User.findOne({ mobile });
        if (existingMobileUser) {
          return res.status(409).json({
            success: false,
            message: 'Mobile number already registered'
          } as IAuthResponse);
        }
      }

      // Create new user
      const user = new User({
        email: email?.toLowerCase(),
        mobile,
        password,
        firstName,
        lastName
      });

      await user.save();

      // Generate tokens
      const token = this.generateToken(user._id);
      const refreshToken = this.generateRefreshToken(user._id);

      // Prepare user data
      const userData = {
        _id: user._id,
        email: user.email,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
        isMobileVerified: user.isMobileVerified,
        role: user.role,
        createdAt: user.createdAt
      };

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: userData,
          token,
          refreshToken
        }
      } as IAuthResponse);

    } catch (error: any) {
      console.error('Registration error:', error);

      // Handle validation errors
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        return res.status(400).json({
          success: false,
          message: messages.join(', ')
        } as IAuthResponse);
      }

      // Handle duplicate key errors
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Email or mobile number already exists'
        } as IAuthResponse);
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as IAuthResponse);
    }
  }

  // Get current user profile
  async getProfile(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: {
          user: {
            _id: user._id,
            email: user.email,
            mobile: user.mobile,
            firstName: user.firstName,
            lastName: user.lastName,
            isEmailVerified: user.isEmailVerified,
            isMobileVerified: user.isMobileVerified,
            role: user.role,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
        }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Refresh token
  async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token is required'
        });
      }

      const secret = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret';

      // Verify refresh token
      const decoded = jwt.verify(refreshToken, secret) as { userId: string };

      // Find user
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid refresh token'
        });
      }

      // Generate new tokens
      const newToken = this.generateToken(user._id);
      const newRefreshToken = this.generateRefreshToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          token: newToken,
          refreshToken: newRefreshToken
        }
      });

    } catch (error) {
      console.error('Refresh token error:', error);
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }
  }
}