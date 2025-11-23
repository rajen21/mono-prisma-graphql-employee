import Redis from 'ioredis';
import logger from '../utils/logger';

const redis = new Redis(process.env.REDIS_URL!);

redis.on('error', (err) => {
  logger.error('Redis connection error:', err);
});

export default redis;