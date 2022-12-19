import { Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TweetsProducerService } from './tweets-producer.service';
import { likeQueueAsyncConfig } from '../../../config/queue/like-queue.config';
import {
  likeQueueName,
  quoteQueueName,
  replyQueueName,
  retweetQueueName,
} from '../../../common/constants';
import { quoteQueueAsyncConfig } from '../../../config/queue/quote-queue.config';
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
  ],
  providers: [TweetsProducerService, Logger],
  exports: [TweetsProducerService],
})
export class TweetsProducerModule {}
