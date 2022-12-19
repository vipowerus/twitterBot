import { ConfigService } from '@nestjs/config';
import { SharedBullAsyncConfiguration } from '@nestjs/bull';

export const accountsQueueAsyncConfig: SharedBullAsyncConfiguration = {
  useFactory: async () => ({
    limiter: {
      max: parseInt(process.env.ACCOUNTS_QUEUE_LIMITER_MAX),
      duration: parseInt(process.env.ACCOUNTS_QUEUE_LIMITER_DURATION),
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      username: process.env.REDIS_USERNAME,
    },
  }),
  inject: [ConfigService],
};
