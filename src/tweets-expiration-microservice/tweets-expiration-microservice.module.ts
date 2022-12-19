import { Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { TweetsExpirationModule } from './providers/tweets-expiration/tweets-expiration.module';

@Module({
  imports: [AppModule, TweetsExpirationModule],
  providers: [],
  controllers: [],
})
export class TweetsExpirationMicroserviceModule {}
