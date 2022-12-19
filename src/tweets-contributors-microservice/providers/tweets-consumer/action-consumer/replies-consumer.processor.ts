import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { tweetsQueueData } from '../../../../common/interfaces/tweets-queue-data.interface';
import { replyQueueName } from '../../../../common/constants';
import { profileData } from '../../../../common/interfaces/profile-data.interface';
import { TweetsConsumerService } from '../tweets-consumer.service';

@Processor(replyQueueName)
export class RepliesConsumerProcessor extends TweetsConsumerService {
  action: string = 'reply';
  reverseAction: string = 'delete_reply';

  @Process()
  async getTweetsAndProcessContributors(
    job: Job<tweetsQueueData>,
  ): Promise<void> {
    const tweetData = job.data;
    this.twitterService.createClient();
    // @TODO refresh tokens data here

    const contributors: profileData[] = await this.getAllEntityContributors(
      this.twitterService.getTweetRepliesContributors,
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
