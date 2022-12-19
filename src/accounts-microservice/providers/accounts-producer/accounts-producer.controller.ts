import { Controller } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AccountsProducerService } from './accounts-producer.service';
import { accountsQueueCron } from '../../common/constants';

@Controller()
export class AccountsProducerController {
  constructor(private readonly accountsQueueService: AccountsProducerService) {}

  @Cron(accountsQueueCron)
  fillQueueWithAccounts(): void {
    return this.accountsQueueService.fillQueueWithAccounts();
  }
}
