import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const tweetsExpirationMicroserviceConfig: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.TWEETS_EXPIRATION_MICROSERVICE_HOST,
    port: parseInt(process.env.TWEETS_EXPIRATION_MICROSERVICE_PORT),
  },
};
