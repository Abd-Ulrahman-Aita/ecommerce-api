import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { AppError } from '../utils/appError';

interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // return res.status(401).json({ message: req.__('auth.unauthorized_no_token') });
    throw new AppError('auth.unauthorized_no_token', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await User.findById(decoded.id).select('-password');
    // if (!user) return res.status(401).json({ message: req.__('auth.unauthorized_user_not_found') });
    if (!user) {
      throw new AppError('auth.unauthorized_user_not_found', 401);
    }

    req.user = user;
    next();
  } catch (err) {
    // return res.status(401).json({ message: req.__('auth.unauthorized_invalid_token') });
    throw new AppError('auth.unauthorized_invalid_token', 401);
  }
};
