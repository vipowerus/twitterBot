import { Module } from '@nestjs/common';
import { CompletionListenerService } from './completion-listener.service';
import { RedisModule } from '../../providers/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [CompletionListenerService],
  exports: [CompletionListenerService],
})
export class CompletionListenerModule {}
