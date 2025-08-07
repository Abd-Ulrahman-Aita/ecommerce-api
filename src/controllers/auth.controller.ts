import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import {
  sendSuccess,
  sendCreated,
  sendError
} from '../utils/response';

// POST /auth/register - Register a new user
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const data = await authService.registerUser(name, email, password);
    return sendCreated(req, res, 'auth.register_success', data);
  } catch (err) {
    next(err);  // handled in global error handler
  }
};

// POST /auth/verify-email - Verify user email with OTP
export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;
    await authService.verifyUserEmail(email, otp);
    return sendSuccess(req, res, 'auth.verified_success');
  } catch (err) {
    next(err);
  }
};

// POST /auth/login - Login user and return token
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    return sendSuccess(req, res, 'auth.login_success', data);
  } catch (err) {
    next(err);
  }
};

// GET /auth/profile - Get current user profile (requires authentication)
export const getProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return sendError(req, res, 'auth.unauthorized', 401);
    
    const data = await authService.getUserProfile(req.user._id);
    return sendSuccess(req, res, 'auth.profile_success', { user: data });
  } catch (err) {
    next(err);
  }
};

// POST /auth/forgot-password - Send OTP to user email for password reset
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    await authService.forgotUserPassword(email);
    return sendSuccess(req, res, 'auth.otp_sent');
  } catch (err) {
    next(err);
  }
};

// POST /auth/reset-password - Reset password using OTP
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp, newPassword } = req.body;
    await authService.resetUserPassword(email, otp, newPassword);
    return sendSuccess(req, res, 'auth.password_reset_success');
  } catch (err) {
    next(err);
  }
};
