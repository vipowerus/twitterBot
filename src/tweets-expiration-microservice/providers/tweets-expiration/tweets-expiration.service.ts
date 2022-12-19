import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '../../../providers/redis/redis.service';
import { TweetsProducerService } from '../../../tweets-processor-microservice/providers/tweets-producer/tweets-producer.service';
import { tweetsData } from '../../../common/interfaces/tweet-data.interface';

@Injectable()
export class TweetsExpirationService implements OnModuleInit {
  constructor(
    private readonly redisService: RedisService,
    private readonly tweetsProducerService: TweetsProducerService,
  ) {}

  async onModuleInit() {
    await this.redisService.waitExpiration(this.processExpiredTweet.bind(this));
  }

  processExpiredTweet(tweetID: string) {
    if (!isNaN(Number(tweetID))) {
      const tweetData: tweetsData = { id: tweetID, text: '' };
      this.tweetsProducerService.fillQueuesWithTweets([tweetData], '', 1);
    }
  }
}
