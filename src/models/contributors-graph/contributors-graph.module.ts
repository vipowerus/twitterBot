import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributorsGraph } from './contributors-graph.entity';
import { ContributorsGraphService } from './contributors-graph.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContributorsGraph])],
  providers: [ContributorsGraphService],
  controllers: [],
})
export class ContributorsGraphModule {}
