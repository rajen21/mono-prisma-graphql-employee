import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

// Since you're attaching the user directly to req.user after login
// and you don't want DataLoader for now
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
  } | null;
}

export interface Context {
  req: AuthRequest;
  res: Response;
  prisma: PrismaClient;
}