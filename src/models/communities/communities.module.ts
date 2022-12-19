import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Communities } from './communities.entity';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Communities])],
  providers: [CommunitiesService],
  controllers: [CommunitiesController],
})
export class CommunitiesModule {}
