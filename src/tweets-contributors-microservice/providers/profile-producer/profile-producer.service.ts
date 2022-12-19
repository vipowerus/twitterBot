import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { profileData } from '../../../common/interfaces/profile-data.interface';
import { profilesQueueName } from '../../../common/constants';

@Injectable()
export class ProfileProducerService {
  constructor(
    @InjectQueue(profilesQueueName) private profileQueue: Queue,
    private readonly logger: Logger,
  ) {}

  fillQueueWithProfiles(contributors: profileData[]) {
    for (const contributor of contributors) {
      const job = this.profileQueue.add({ payload: contributor });
      job.then(
        () => {},
        (reason) => {
          this.logger.error('', reason);
        },
      );
    }
  }
}
