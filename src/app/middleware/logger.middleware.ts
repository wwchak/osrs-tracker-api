import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Logger } from '../common/logger';

export const requestLogger = (): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  next();
  Logger.log(res.statusCode, req.method, req.originalUrl);
};
