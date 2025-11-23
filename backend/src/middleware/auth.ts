import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
import prisma from '../services/prisma';
import { Context ,AuthRequest} from '../types/context';


export const authMiddleware = async (req: AuthRequest, _: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    req.user = user;
  } catch (err) {
    // Invalid token
  }
  next();
};

export const requireRole = (roles: string[]) => {
  return (_: any, __: any, context: Context, next: NextFunction) => {
    const user = context.req.user;
    if (!user || !roles.includes(user.role)) {
      throw new Error('Forbidden: Insufficient permissions');
    }
    return next();
  };
};