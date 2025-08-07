export class AppError extends Error {
  public statusCode: number;
  public messageKey: string;
  public data?: any;

  constructor(messageKey: string, statusCode = 500, data?: any) {
    super(messageKey);  
    this.statusCode = statusCode;
    this.messageKey = messageKey;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}
