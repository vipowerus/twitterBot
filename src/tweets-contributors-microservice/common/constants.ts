import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const tweetsContributorsMicroserviceConfig: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.TWEETS_CONTRIBUTORS_MICROSERVICE_HOST,
    port: parseInt(process.env.TWEETS_CONTRIBUTORS_MICROSERVICE_PORT),
  },
};
