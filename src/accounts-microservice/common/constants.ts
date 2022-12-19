import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const accountsQueueCron: string = process.env.ACCOUNTS_QUEUE_CRON;
export const accountsMicroserviceConfig: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.ACCOUNTS_MICROSERVICE_HOST,
    port: parseInt(process.env.ACCOUNTS_MICROSERVICE_PORT),
  },
};
