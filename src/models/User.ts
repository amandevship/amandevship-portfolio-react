import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
      lowercase: true,
      trim: true,
      validate: {
        validator: function(email: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: 'Please provide a valid email address'
      }
    },
    mobile: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      validate: {
        validator: function(mobile: string) {
          return /^\+?[1-9]\d{1,14}$/.test(mobile);
        },
        message: 'Please provide a valid mobile number'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // Don't include password in queries by default
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isMobileVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationToken: String,
    mobileVerificationToken: String,
    emailVerificationExpires: Date,
    mobileVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: Date,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account lock
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > new Date());
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ mobile: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', function(next: any) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Use arrow function for async operations
  bcrypt.genSalt(12).then(salt => {
    return bcrypt.hash(this.password, salt);
  }).then(hash => {
    this.password = hash;
    next();
  }).catch((error: any) => {
    next(error);
  });
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < new Date()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }

  const updates: any = { $inc: { loginAttempts: 1 } };

  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = {
      lockUntil: Date.now() + 2 * 60 * 60 * 1000 // 2 hours
    };
  }

  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
    $set: { lastLogin: new Date() }
  });
};

// Static method to find user by email or mobile
userSchema.statics.findByIdentifier = function(identifier: string, select?: string) {
  // Check if identifier is email or mobile
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  let query;
  if (isEmail) {
    query = this.findOne({ email: identifier.toLowerCase() });
  } else {
    query = this.findOne({ mobile: identifier });
  }

  if (select) {
    query = query.select(select);
  }

  return query;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;