// src/index.ts
import 'reflect-metadata';
import dotenv from 'dotenv';
import { startServer } from './server';
import logger from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    const { httpServer } = await startServer();

    httpServer.listen(PORT, () => {
      logger.info(`GraphQL Server is running on http://localhost:${PORT}/graphql`);
      logger.info(`GraphQL Playground: http://localhost:${PORT}/graphql`);
    });

    // Graceful shutdown
    const shutdown = () => {
      logger.info('Shutting down server...');
      httpServer.close(() => {
        logger.info('Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();