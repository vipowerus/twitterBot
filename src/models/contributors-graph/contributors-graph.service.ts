import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContributorsGraph } from './contributors-graph.entity';

@Injectable()
export class ContributorsGraphService {
  constructor(
    @InjectRepository(ContributorsGraph)
    private communitiesRepository: Repository<ContributorsGraph>,
  ) {}
}
