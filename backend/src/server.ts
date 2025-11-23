// src/server.ts
import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import prisma from './services/prisma';
import helmet from 'helmet';
import depthLimit from 'graphql-depth-limit';
import { authMiddleware } from './middleware/auth';
// import { apiLimiter } from './middleware/rateLimiter';
import logger from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { createSchema } from './graphql/schema';
import { PrismaClient } from '@prisma/client';


// Define Context type for GraphQL
export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  user?: any; // Replace 'any' with your actual User type from auth middleware
}

export async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Security - Apply helmet globally
  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  // Build GraphQL Schema
  const schema = await createSchema();

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    validationRules: [depthLimit(10)],
    formatError: (err) => {
      logger.error(err);
      return {
        message: err.message,
        code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
      };
    },
  });

  await server.start();

  // Apply middleware specifically for GraphQL route
  app.use(
    '/graphql',
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    }),
    express.json(),
    // apiLimiter, // Uncomment if you want rate limiting
    authMiddleware,
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<Context> => ({
        req,
        res,
        prisma,
        user: (req as any).user, // Populated by authMiddleware
      }),
    })
  );

  // Health check endpoint
  app.get('/health', (_, res) => {
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString() 
    });
  });

  // Global error handler (must be last)
  app.use(errorHandler);

  return { server, app, httpServer };
}