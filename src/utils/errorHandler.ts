import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
};
