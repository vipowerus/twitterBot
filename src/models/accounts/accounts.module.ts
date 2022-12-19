import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { Accounts } from './accounts.entity';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [TypeOrmModule, AccountsService],
})
export class AccountsModule {}
