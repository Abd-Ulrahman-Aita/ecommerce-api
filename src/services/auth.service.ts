import bcrypt from 'bcryptjs';
import User from '../models/User';
import Otp from '../models/Otp';
import { generateOtp, otpExpiry } from '../utils/otp';
import { sendOtpEmail } from '../config/mail';
import { generateToken } from '../utils/jwt';
import { hashPassword } from '../utils/hash';
import { AppError } from '../utils/appError';

export const registerUser = async (name: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw new AppError('auth.email_exists', 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const code = generateOtp();
  const expiresAt = otpExpiry();

  await Otp.create({ userId: user._id, code, expiresAt });
  await sendOtpEmail(email, code);

  return { userId: user._id };
};

export const verifyUserEmail = async (email: string, otp: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new AppError('auth.user_not_found', 404);
  
  if (user.isVerified) throw new AppError('auth.already_verified', 400);

  const otpRecord = await Otp.findOne({ userId: user._id, code: otp });
  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    throw new AppError('auth.otp_invalid', 400);
  }

  user.isVerified = true;
  await user.save();
  await Otp.deleteMany({ userId: user._id });
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new AppError('auth.invalid_credentials', 401);
  
  if (!user.isVerified) throw new AppError('auth.not_verified', 403);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError('auth.invalid_credentials', 401);

  const token = generateToken(user);
  return { token };
};

export const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError('auth.user_not_found', 404);

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };
};

export const forgotUserPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new AppError('auth.user_not_found', 404);

  const otp = generateOtp();
  const expires = otpExpiry();

  user.passwordResetOtp = otp;
  user.passwordResetOtpExpires = expires;
  await user.save();

  await sendOtpEmail(user.email, otp, 'Password Reset OTP');
};

export const resetUserPassword = async (email: string, otp: string, newPassword: string) => {
  const user = await User.findOne({ email });

  if (!user || !user.passwordResetOtp || !user.passwordResetOtpExpires) {
    throw new AppError('auth.invalid_request', 400);
  }

  if (user.passwordResetOtp !== otp || user.passwordResetOtpExpires < new Date()) {
    throw new AppError('auth.otp_invalid', 400);
  }

  user.password = await hashPassword(newPassword);
  user.passwordResetOtp = undefined;
  user.passwordResetOtpExpires = undefined;
  await user.save();
};