import { Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ProfileProducerService } from './profile-producer.service';
import { profilesQueueAsyncConfig } from '../../../config/queue/profiles-queue.config';
import { profilesQueueName } from '../../../common/constants';

@Module({
  imports: [
    BullModule.forRootAsync(profilesQueueAsyncConfig),
    BullModule.registerQueue({ name: profilesQueueName }),
  ],
  providers: [ProfileProducerService, Logger],
  controllers: [],
  exports: [ProfileProducerService],
})
export class ProfileProducerModule {}
