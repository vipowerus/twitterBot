import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AccountsService } from '../../../models/accounts/accounts.service';
import { Accounts } from '../../../models/accounts/accounts.entity';
import { accountsQueueName } from '../../../common/constants';
import { accountsQueueData } from '../../../common/interfaces/accounts-queue-data.interface';
import { Logger } from '@nestjs/common';

export class AccountsProducerService {
  constructor(
    @InjectQueue(accountsQueueName) private accountsQueue: Queue,
    private readonly accountsService: AccountsService,
    private readonly logger: Logger,
  ) {}

  fillQueueWithAccounts(): void {
    let accountsToProcess: Promise<Accounts[]> =
      this.accountsService.getAccountsToProcess();

    accountsToProcess.then(
      (accounts: Accounts[]) => {
        for (let account of accounts) {
          const data: accountsQueueData = {
            access_token: account.access_token,
            payload: {
              id: account.id,
              refresh_token: account.refresh_token,
              token_expiration: account.token_expiration,
              last_scanned_at: account.last_scanned_at,
              max_scanned_content_id: account.max_scanned_content_id,
              platform_id: account.platform_id,
            },
          };

          const job = this.accountsQueue.add(data);
          job.then(
            () => {},
            (reason) => {
              this.logger.error('', reason);
            },
          );
        }
      },
      (reason) => {
        this.logger.error('', reason);
      },
    );
  }
}
