import { createClient } from 'redis';
import { profileData } from '../../common/interfaces/profile-data.interface';
import { redisConfig } from '../../config/redis/redis.config';

export class RedisService {
  private client;
  constructor() {
    this.client = createClient(redisConfig);
    this.client.connect();
  }

  async getSetMembers(key: string): Promise<string[]> {
    return await this.client.sMembers(key);
  }
  async getSetSize(key: string): Promise<any> {
    return await this.client.sCard(key);
  }

  async setContributors(key: string, contributors: string[]) {
    return await this.client.sAdd(key, contributors);
  }

  async getContributorsDiffs(first: string, second: string) {
    return await this.client.sDiff([first, second]);
  }

  async renameKey(oldName: string, newName: string) {
    return await this.client.RENAME(oldName, newName);
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async set(key: string, value: string) {
    return await this.client.set(key, value);
  }

  async del(key: string) {
    return await this.client.del(key);
  }

  async setKeyExpire(key: string, value: number) {
    return await this.client.expire(key, value);
  }

  async addXADDRecordToRedisStream(
    contributors: profileData[],
    eventType: string,
  ) {}

  async addCompletionRecordToRedis(
    tweetId: string,
    action: string,
    ratio: number,
  ) {
    return await this.client.sAdd(
      tweetId + ':latest_contrib',
      action + '=' + ratio,
    );
  }

  async waitExpiration(test: Function) {
    const sub = this.client.duplicate();
    await sub.connect();
    await sub.subscribe('__keyevent@0__:expired', (message) => test(message));
  }
}
