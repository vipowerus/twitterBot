import { Controller, Get } from '@nestjs/common';
import { TwitterService } from './twitter.service';

@Controller()
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}
}
