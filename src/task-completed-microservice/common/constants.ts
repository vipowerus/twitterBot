import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const taskCompletedMicroserviceConfig: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.TASK_COMPLETED_MICROSERVICE_HOST,
    port: parseInt(process.env.TASK_COMPLETED_MICROSERVICE_PORT),
  },
};
