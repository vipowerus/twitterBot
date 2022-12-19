import { RedisClientOptions } from '@redis/client/dist/lib/client';

export const redisConfig: RedisClientOptions = {
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    tls: process.env.REDIS_TLS === 'true',
  },
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME,
};
