import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg
      }))
    });
    return;
  }
  next();
};

// Login validation rules
export const validateLogin = [
  body('identifier')
    .notEmpty()
    .withMessage('Identifier (email or mobile) is required')
    .isLength({ min: 1 })
    .withMessage('Identifier cannot be empty'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  handleValidationErrors
];

// Registration validation rules
export const validateRegister = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .trim()
    .escape(),

  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .trim()
    .escape(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

  // Email validation (optional)
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // Mobile validation (optional)
  body('mobile')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid mobile number'),

  // Ensure at least one identifier is provided
  body()
    .custom((value, { req }) => {
      if (!req.body.email && !req.body.mobile) {
        throw new Error('Either email or mobile number must be provided');
      }
      return true;
    }),

  handleValidationErrors
];

// Password reset validation
export const validatePasswordReset = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('mobile')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid mobile number'),

  body()
    .custom((value, { req }) => {
      if (!req.body.email && !req.body.mobile) {
        throw new Error('Either email or mobile number must be provided');
      }
      return true;
    }),

  handleValidationErrors
];

// Change password validation
export const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),

  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match new password');
      }
      return true;
    }),

  handleValidationErrors
];