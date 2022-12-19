import { Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { TweetsConsumerModule } from './providers/tweets-consumer/tweets-consumer.module';

@Module({
  imports: [AppModule, TweetsConsumerModule],
  providers: [],
  controllers: [],
})
export class TweetsContributorsMicroserviceModule {}
