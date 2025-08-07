import { Response } from 'express';

export const sendSuccess = (req: any, res: Response, key: string, data: any = {}) => {
  return res.status(200).json({
    message: req.__(key),
    ...data
  });
};

export const sendCreated = (req: any, res: Response, key: string, data: any = {}) => {
  return res.status(201).json({
    message: req.__(key),
    ...data
  });
};

export const sendBadRequest = (res: Response, key: string, data: any = {}) => {
  return res.status(400).json({ message: res.req.__(key), ...data });
};

export const sendForbidden = (res: Response, key: string) => {
  return res.status(403).json({ message: res.req.__(key) });
};

export const sendNotFound = (res: Response, key: string, data: any = {}) => {
  return res.status(404).json({ message: res.req.__(key), ...data });
};

export const sendError = (req: any, res: Response, key: string, statusCode = 400, extra: any = {}) => {
  return res.status(statusCode).json({
    message: req.__(key),
    ...extra
  });
};

export const sendServerError = (req: any, res: Response, error: any) => {
  return res.status(500).json({
    message: req.__('server_error'),
    error
  });
};
