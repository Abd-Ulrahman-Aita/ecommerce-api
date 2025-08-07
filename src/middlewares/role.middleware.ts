import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/express';
import { UserRole } from '../models/User';
import { AppError } from '../utils/appError';

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === UserRole.ADMIN) {
    return next();
  }
  // return res.status(403).json({ message: req.__('auth.forbidden_admin') });
  throw new AppError('auth.forbidden_admin', 403);
};