import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const globalErrorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: req.__(err.messageKey),  // translate error message by language
    });
  }

  console.error(err);
  return res.status(500).json({
    message: req.__('server_error'),
  });
};
