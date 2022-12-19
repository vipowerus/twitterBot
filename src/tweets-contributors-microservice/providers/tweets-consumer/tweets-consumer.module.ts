import { Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import {
  likeQueueName,
  quoteQueueName,
  replyQueueName,
  retweetQueueName,
} from '../../../common/constants';
import { LikesConsumerProcessor } from './action-consumer/likes-consumer.processor';
import { TwitterModule } from '../../../providers/twitter/twitter.module';
import { AccountsModule } from '../../../models/accounts/accounts.module';
import { RedisModule } from '../../../providers/redis/redis.module';
import { likeQueueAsyncConfig } from '../../../config/queue/like-queue.config';
import { ProfileProducerModule } from '../profile-producer/profile-producer.module';
import { QuotesConsumerProcessor } from './action-consumer/quotes-consumer.processor';
import { quoteQueueAsyncConfig } from '../../../config/queue/quote-queue.config';
import { RepliesConsumerProcessor } from './action-consumer/replies-consumer.processor';
import { RetweetsConsumerProcessor } from './action-consumer/retweets-consumer.processor';
import { replyQueueAsyncConfig } from '../../../config/queue/reply-queue.config';
import { retweetQueueAsyncConfig } from '../../../config/queue/retweet-queue.config';

@Module({
  imports: [
    BullModule.forRootAsync(likeQueueAsyncConfig),
    BullModule.forRootAsync(quoteQueueAsyncConfig),
    BullModule.forRootAsync(replyQueueAsyncConfig),
    BullModule.forRootAsync(retweetQueueAsyncConfig),
    BullModule.registerQueue(
      { name: likeQueueName },
      { name: quoteQueueName },
      { name: replyQueueName },
      { name: retweetQueueName },
    ),
    BullModule.registerQueue(),
    TwitterModule,
    RedisModule,
    AccountsModule,
    ProfileProducerModule,
  ],
  providers: [
    LikesConsumerProcessor,
    QuotesConsumerProcessor,
    RepliesConsumerProcessor,
    RetweetsConsumerProcessor,
    Logger,
  ],
  controllers: [],
})
export class TweetsConsumerModule {}
