import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  processingCompletedEventName,
  ttl,
  ttlBounds,
} from '../../common/constants';
import { RedisService } from '../../providers/redis/redis.service';

@Injectable()
export class CompletionListenerService {
  constructor(private readonly redisService: RedisService) {}

  @OnEvent(processingCompletedEventName)
  async handleOrderCreatedEvent(tweetId: string) {
    const setSize = await this.redisService.getSetSize(
      tweetId + ':latest_contrib',
    );
    if (setSize === 4) {
      const sMembers = await this.redisService.getSetMembers(
        tweetId + ':latest_contrib',
      );
      const derivatives = Array.from(
        sMembers.map((str) => str.substring(str.indexOf('=') + 1, str.length)),
        Number,
      );
      const maxDerivative = Math.max(...derivatives);
      const ttl = this.computeTTL(maxDerivative);
      if (ttl !== 0) {
        await this.redisService.set(tweetId, tweetId);
        await this.redisService.setKeyExpire(tweetId, ttl);
        await this.redisService.del(tweetId + ':latest_contrib');
      }
    }
  }

  computeTTL(value: number): number {
    for (let i = 0; i < ttlBounds.length; i++) {
      if (ttlBounds[i] < value) {
        return ttl[i];
      }
    }
    return 0;
  }
}
