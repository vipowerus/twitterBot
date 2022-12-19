import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { tweetsQueueData } from '../../../../common/interfaces/tweets-queue-data.interface';
import { quoteQueueName } from '../../../../common/constants';
import { profileData } from '../../../../common/interfaces/profile-data.interface';
import { TweetsConsumerService } from '../tweets-consumer.service';

@Processor(quoteQueueName)
export class QuotesConsumerProcessor extends TweetsConsumerService {
  action: string = 'quote';
  reverseAction: string = 'delete_quote';

  @Process()
  async getTweetsAndProcessContributors(
    job: Job<tweetsQueueData>,
  ): Promise<void> {
    const tweetData = job.data;
    this.twitterService.createClient();

    const contributors: profileData[] = await this.getAllEntityContributors(
      this.twitterService.getTweetQuotesContributors,
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
