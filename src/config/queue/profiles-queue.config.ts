import { ConfigService } from '@nestjs/config';
import { SharedBullAsyncConfiguration } from '@nestjs/bull';

export const profilesQueueAsyncConfig: SharedBullAsyncConfiguration = {
  useFactory: async () => ({
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      username: process.env.REDIS_USERNAME,
    },
  }),
  inject: [ConfigService],
};
