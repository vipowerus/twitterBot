import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { tweetsQueueData } from '../../../../common/interfaces/tweets-queue-data.interface';
import { likeQueueName } from '../../../../common/constants';
import { profileData } from '../../../../common/interfaces/profile-data.interface';
import { TweetsConsumerService } from '../tweets-consumer.service';

@Processor(likeQueueName)
export class LikesConsumerProcessor extends TweetsConsumerService {
  action: string = 'like';
  reverseAction: string = 'unlike';

  @Process()
  async getTweetsAndProcessContributors(
    job: Job<tweetsQueueData>,
  ): Promise<void> {
    const tweetData = job.data;
    this.twitterService.createClient();

    const contributors: profileData[] = await this.getAllEntityContributors(
      this.twitterService.getTweetLikesContributors,
      tweetData.tweetId,
      null,
    );
    await this.processContributors(
      contributors,
      tweetData.tweetId,
      this.action,
      this.reverseAction,
    );
  }
}
