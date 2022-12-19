import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { tweetsQueueData } from '../../../common/interfaces/tweets-queue-data.interface';
import { tweetsData } from '../../../common/interfaces/tweet-data.interface';
import {
  likeQueueName,
  quoteQueueName,
  replyQueueName,
  retweetQueueName,
} from '../../../common/constants';

@Injectable()
export class TweetsProducerService {
  constructor(
    @InjectQueue(likeQueueName) private likesQueue: Queue,
    @InjectQueue(quoteQueueName) private quotesQueue: Queue,
    @InjectQueue(replyQueueName) private repliesQueue: Queue,
    @InjectQueue(retweetQueueName) private retweetsQueue: Queue,
    private readonly logger: Logger,
  ) {}

  fillQueuesWithTweets(
    tweets: tweetsData[],
    userId: string,
    page: number,
  ): void {
    for (const tweet of tweets) {
      const data: tweetsQueueData = {
        tweetId: tweet.id,
        payload: {
          userId: userId,
          page: page,
        },
      };
      this.createJob(data, this.likesQueue);
      this.createJob(data, this.quotesQueue);
      this.createJob(data, this.repliesQueue);
      this.createJob(data, this.retweetsQueue);
    }
  }

  createJob(data: tweetsQueueData, queue: Queue) {
    const job = queue.add(data);
    job.then(
      () => {},
      (reason) => {
        this.logger.error('', reason);
      },
    );
  }
}
