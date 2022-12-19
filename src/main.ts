import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AccountsMicroserviceModule } from './accounts-microservice/accounts-microservice.module';
import { accountsMicroserviceConfig } from './accounts-microservice/common/constants';
import { TweetsProcessorMicroserviceModule } from './tweets-processor-microservice/tweets-processor-microservice.module';
import { consumerMicroserviceConfig } from './tweets-processor-microservice/common/constants';
import { TweetsContributorsMicroserviceModule } from './tweets-contributors-microservice/tweets-contributors-microservice.module';
import { tweetsContributorsMicroserviceConfig } from './tweets-contributors-microservice/common/constants';
import { taskCompletedMicroserviceConfig } from './task-completed-microservice/common/constants';
import { TaskCompletedMicroserviceModule } from './task-completed-microservice/task-completed-microservice.module';
import { TweetsExpirationMicroserviceModule } from './tweets-expiration-microservice/tweets-expiration-microservice.module';
import { tweetsExpirationMicroserviceConfig } from './tweets-expiration-microservice/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);

  const accountsMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AccountsMicroserviceModule,
      accountsMicroserviceConfig,
    );
  await accountsMicroservice.listen();

  const consumerMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      TweetsProcessorMicroserviceModule,
      consumerMicroserviceConfig,
    );
  await consumerMicroservice.listen();

  const tweetsContributorsMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      TweetsContributorsMicroserviceModule,
      tweetsContributorsMicroserviceConfig,
    );
  await tweetsContributorsMicroservice.listen();

  const taskCompletedMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      TaskCompletedMicroserviceModule,
      taskCompletedMicroserviceConfig,
    );
  await taskCompletedMicroservice.listen();

  const tweetsExpirationMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      TweetsExpirationMicroserviceModule,
      tweetsExpirationMicroserviceConfig,
    );
  await tweetsExpirationMicroservice.listen();
}
bootstrap();
