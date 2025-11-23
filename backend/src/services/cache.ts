
import redis from './redis';

const CACHE_TTL = 60; // 1 minute

export const cache = {
  get: async <T>(key: string): Promise<T | null> => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },
  set: async (key: string, value: any, ttl = CACHE_TTL) => {
    await redis.setex(key, ttl, JSON.stringify(value));
  },
  del: async (key: string) => {
    await redis.del(key);
  },
  invalidatePattern: async (pattern: string) => {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(keys);
  },
};