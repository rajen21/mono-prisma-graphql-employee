import { Request, Response, NextFunction } from 'express';
import { GraphQLError } from 'graphql';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof GraphQLError) {
    return res.status(400).json({
      errors: [{ message: err.message, code: err.extensions?.code }],
    });
  }

  logger.error(err);
  res.status(500).json({
    errors: [{ message: 'Internal server error' }],
  });
};