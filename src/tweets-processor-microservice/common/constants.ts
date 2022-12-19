import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const consumerMicroserviceConfig: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.TWEETS_PROCESSOR_MICROSERVICE_HOST,
    port: parseInt(process.env.TWEETS_PROCESSOR_MICROSERVICE_PORT),
  },
};
