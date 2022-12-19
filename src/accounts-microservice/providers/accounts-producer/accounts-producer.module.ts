import { Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AccountsProducerService } from './accounts-producer.service';
import { AccountsProducerController } from './accounts-producer.controller';
import { AccountsModule } from '../../../models/accounts/accounts.module';
import { accountsQueueAsyncConfig } from '../../../config/queue/accounts-queue.config';
import { accountsQueueName } from '../../../common/constants';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    BullModule.forRootAsync(accountsQueueAsyncConfig),
    BullModule.registerQueue({ name: accountsQueueName }),
    ScheduleModule.forRoot(),
    AccountsModule,
  ],
  providers: [AccountsProducerService, Logger],
  controllers: [AccountsProducerController],
})
export class AccountsProducerModule {}
