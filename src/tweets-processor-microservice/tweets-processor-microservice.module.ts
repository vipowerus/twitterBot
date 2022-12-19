import { Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { AccountsConsumerModule } from './providers/accounts-consumer/accounts-consumer.module';

@Module({
  imports: [AppModule, AccountsConsumerModule],
  providers: [],
  controllers: [],
})
export class TweetsProcessorMicroserviceModule {}
