import { Process, Processor } from '@nestjs/bull';
import { accountsQueueName } from '../../../common/constants';
import { accountsQueueData } from '../../../common/interfaces/accounts-queue-data.interface';
import { Job } from 'bull';
import { TwitterService } from '../../../providers/twitter/twitter.service';
import { Logger } from '@nestjs/common';
import { TweetsProducerService } from '../tweets-producer/tweets-producer.service';
import { AccountsService } from '../../../models/accounts/accounts.service';

@Processor(accountsQueueName)
export class AccountsConsumerProcessor {
  constructor(
    private readonly tweetsProducerService: TweetsProducerService,
    private readonly twitterService: TwitterService,
    private readonly accountsService: AccountsService,
    private readonly logger: Logger,
  ) {}

  @Process()
  async getAccounts(job: Job<accountsQueueData>): Promise<void> {
    let accountsData = job.data;
    accountsData = await this.twitterService.checkAndUpdateTokenIfNecessary(
      accountsData,
    );
    this.twitterService.createClient(accountsData.access_token);
    await this.getAndProcessTweets(accountsData, null, 1);
  }

  async getAndProcessTweets(
    accountsData: accountsQueueData,
    paginationToken: string,
    page: number,
  ): Promise<void> {
    const tweets = await this.twitterService.getUserTweets(
      accountsData.payload.platform_id,
      accountsData.payload.max_scanned_content_id,
      paginationToken,
    );

    if (page == 1)
      this.accountsService.updateWithLastScanData(
        accountsData.payload.id,
        tweets.meta.newest_id,
      );

    this.tweetsProducerService.fillQueuesWithTweets(
      tweets.data,
      accountsData.payload.platform_id,
      page,
    );

    if (tweets.meta.next_token !== undefined)
      return this.getAndProcessTweets(
        accountsData,
        tweets.meta.next_token,
        ++page,
      );
    else return;
  }
}
