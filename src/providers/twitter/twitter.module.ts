import { Logger, Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { AccountsModule } from '../../models/accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  providers: [TwitterService, Logger],
  controllers: [TwitterController],
  exports: [TwitterService],
})
export class TwitterModule {}
