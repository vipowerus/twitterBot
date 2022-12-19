import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThan, Repository } from 'typeorm';
import { Accounts } from './accounts.entity';
import { ConfigService } from '@nestjs/config';
import { accountsQueueData } from '../../common/interfaces/accounts-queue-data.interface';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
    private readonly configService: ConfigService,
  ) {}

  getAccountsToProcess(): Promise<Accounts[]> {
    let expiration_date = new Date();
    expiration_date.setMinutes(
      expiration_date.getMinutes() -
        this.configService.get('ACCOUNTS_QUEUE_SCAN_INTERVAL'),
    );

    return this.accountsRepository.findBy([
      { last_scanned_at: IsNull() },
      { last_scanned_at: LessThan(expiration_date) },
    ]);
  }

  updateWithAccountsQueueData(data: accountsQueueData) {
    this.accountsRepository.findOneBy({ id: data.payload.id }).then(
      (account) => {
        account.access_token = data.access_token;
        account.refresh_token = data.payload.refresh_token;
        account.token_expiration = data.payload.token_expiration;
        this.accountsRepository.save(account);
      },
      (error) => {},
    );
  }

  updateWithLastScanData(userId: string, maxScannedContentId: string) {
    this.accountsRepository.findOneBy({ id: userId }).then(
      (account) => {
        account.max_scanned_content_id = maxScannedContentId;
        account.last_scanned_at = new Date();
        this.accountsRepository.save(account);
      },
      (error) => {},
    );
  }
}
