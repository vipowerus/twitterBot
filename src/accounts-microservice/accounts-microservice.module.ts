import { Module } from '@nestjs/common';
import { AccountsProducerModule } from './providers/accounts-producer/accounts-producer.module';
import { AppModule } from '../app.module';

@Module({
  imports: [AppModule, AccountsProducerModule],
  providers: [],
  controllers: [],
})
export class AccountsMicroserviceModule {}
