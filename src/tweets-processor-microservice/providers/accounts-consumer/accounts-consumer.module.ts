import { Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AccountsConsumerProcessor } from './accounts-consumer.processor';
import { accountsQueueAsyncConfig } from '../../../config/queue/accounts-queue.config';
import {
  accountsQueueName,
  likeQueueName,
  quoteQueueName,
  replyQueueName,
  retweetQueueName,
} from '../../../common/constants';
import { TwitterModule } from '../../../providers/twitter/twitter.module';
import { TwitterService } from '../../../providers/twitter/twitter.service';
import { AccountsModule } from '../../../models/accounts/accounts.module';
import { TweetsProducerService } from '../tweets-producer/tweets-producer.service';
import { TweetsProducerModule } from '../tweets-producer/tweets-producer.module';

@Module({
  imports: [
    BullModule.forRootAsync(accountsQueueAsyncConfig),
    BullModule.registerQueue(
      { name: accountsQueueName },
      { name: likeQueueName },
      { name: quoteQueueName },
      { name: replyQueueName },
      { name: retweetQueueName },
    ),
    TweetsProducerModule,
    TwitterModule,
    AccountsModule,
  ],
  providers: [
    AccountsConsumerProcessor,
    TweetsProducerService,
    TwitterService,
    Logger,
  ],
  controllers: [],
})
export class AccountsConsumerModule {}
