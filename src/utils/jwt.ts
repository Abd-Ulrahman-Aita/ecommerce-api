import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms';
import { IUser, UserRole } from '../models/User';

export const generateToken = (user: IUser): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');

  const jwtExpires = process.env.JWT_EXPIRES_IN || '1d';

  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role as UserRole,
  };

  const options: SignOptions = {
    expiresIn: jwtExpires as ms.StringValue,
  };

  return jwt.sign(payload, secret, options);
};
