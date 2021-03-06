import type { RequestHandler } from 'express';

export const attachRequestId: RequestHandler = (req, _res, next) => {
  req.requestId = String(Math.random());
  next();
};
