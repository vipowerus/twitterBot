import { Injectable } from '@nestjs/common';
import { profileData } from '../../../common/interfaces/profile-data.interface';
import { TwitterService } from '../../../providers/twitter/twitter.service';
import { RedisService } from '../../../providers/redis/redis.service';
import { ProfileProducerService } from '../profile-producer/profile-producer.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { processingCompletedEventName, ttl } from '../../../common/constants';

@Injectable()
export class TweetsConsumerService {
  constructor(
    private readonly profileProducerService: ProfileProducerService,
    protected readonly twitterService: TwitterService,
    private readonly redisService: RedisService,
    private eventEmitter: EventEmitter2,
  ) {}

  protected async getAllEntityContributors(
    getter: Function,
    tweetId: string,
    paginationToken: string,
  ): Promise<any> {
    const data = await getter.bind(this.twitterService)(
      tweetId,
      paginationToken,
    );

    if (data.meta.next_token !== undefined) {
      return data.data.concat(
        await this.getAllEntityContributors(
          getter,
          tweetId,
          data.meta.next_token,
        ),
      );
    } else return data.data ?? [];
  }

  protected async processContributors(
    contributors: profileData[],
    tweetId: string,
    action: string,
    reverseAction: string,
  ) {
    const key = tweetId + ':' + action;

    const contributorsIds: string[] = contributors
      ? contributors.map((user) => user.id)
      : [];

    const oldContributors = await this.redisService.getSetMembers(key);

    if (oldContributors.length === 0 && contributors.length !== 0) {
      await this.redisService.setContributors(key, contributorsIds);
      this.profileProducerService.fillQueueWithProfiles(contributors);
      await this.redisService.addXADDRecordToRedisStream(contributors, action);
      await this.completeContributorsProcessing(
        tweetId,
        action,
        contributors.length,
      );
    } else {
      if (contributorsIds.length !== 0)
        await this.redisService.setContributors(key + ':new', contributorsIds);

      const newContributorsIds = await this.redisService.getContributorsDiffs(
        key + ':new',
        key,
      );
      const newContributors = contributors.filter((contributor) =>
        newContributorsIds.includes(contributor.id),
      );

      const withdrawnContributorsIds =
        await this.redisService.getContributorsDiffs(key, key + ':new');
      const withdrawnContributors = contributors.filter((contributor) =>
        withdrawnContributorsIds.includes(contributor.id),
      );

      this.profileProducerService.fillQueueWithProfiles(newContributors);
      await this.redisService.addXADDRecordToRedisStream(
        newContributors,
        action,
      );

      this.profileProducerService.fillQueueWithProfiles(withdrawnContributors);
      await this.redisService.addXADDRecordToRedisStream(
        withdrawnContributors,
        reverseAction,
      );
      if (contributorsIds.length !== 0)
        await this.redisService.renameKey(key + ':new', key);

      await this.completeContributorsProcessing(
        tweetId,
        action,
        newContributors.length + withdrawnContributors.length,
      );
    }
  }

  private async completeContributorsProcessing(
    tweetId: string,
    action: string,
    contributorsCount: number,
  ) {
    const tweetTTL: number = +(await this.redisService.get(tweetId + ':ttl'));
    await this.redisService.addCompletionRecordToRedis(
      tweetId,
      action,
      contributorsCount / (Boolean(tweetTTL) ? tweetTTL : ttl[0]),
    );
    this.eventEmitter.emit(processingCompletedEventName, tweetId);
  }
}
