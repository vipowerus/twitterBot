import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Communities } from './communities.entity';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Communities)
    private communitiesRepository: Repository<Communities>,
  ) {}
}
