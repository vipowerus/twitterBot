import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/database/typeorm.config';
import { Accounts } from './models/accounts/accounts.entity';
import { Communities } from './models/communities/communities.entity';
import { ContributorsGraph } from './models/contributors-graph/contributors-graph.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([Accounts, Communities, ContributorsGraph]),
    EventEmitterModule.forRoot(),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
