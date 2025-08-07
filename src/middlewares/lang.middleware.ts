import { Request, Response, NextFunction } from 'express';

const supportedLanguages = ['en', 'ar'];
const defaultLang = 'en';

declare module 'express-serve-static-core' {
  interface Request {
    lang?: string;
  }
}

export const langMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let lang = req.headers['accept-language']?.split(',')[0] || defaultLang;

  if (!supportedLanguages.includes(lang)) {
    lang = defaultLang;
  }

  req.lang = lang;
  next();
};
