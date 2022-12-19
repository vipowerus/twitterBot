import { Module } from '@nestjs/common';
import { RedisModule } from '../../../providers/redis/redis.module';
import { TweetsExpirationService } from './tweets-expiration.service';
import { TweetsProducerModule } from '../../../tweets-processor-microservice/providers/tweets-producer/tweets-producer.module';

@Module({
  imports: [RedisModule, TweetsProducerModule],
  providers: [TweetsExpirationService],
  exports: [TweetsExpirationService],
})
export class TweetsExpirationModule {}
