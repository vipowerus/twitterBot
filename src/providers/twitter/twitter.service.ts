import { Client } from 'twitter-api-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { accountsQueueData } from '../../common/interfaces/accounts-queue-data.interface';
import fetch from 'cross-fetch';
import { AccountsService } from '../../models/accounts/accounts.service';

@Injectable()
export class TwitterService {
  client: Client;
  userFields: (
    | 'description'
    | 'id'
    | 'location'
    | 'name'
    | 'pinned_tweet_id'
    | 'profile_image_url'
    | 'protected'
    | 'public_metrics'
    | 'url'
    | 'username'
    | 'verified'
    | 'entities'
    | 'withheld'
  )[] = [
    'description',
    'id',
    'location',
    'name',
    'pinned_tweet_id',
    'profile_image_url',
    'protected',
    'public_metrics',
    'url',
    'username',
    'verified',
  ];

  constructor(
    private readonly accountsService: AccountsService,
    private readonly logger: Logger,
  ) {}

  createClient(token: string = process.env.TWITTER_AUTH_TOKEN): void {
    this.client = new Client(token);
  }

  async checkAndUpdateTokenIfNecessary(
    data: accountsQueueData,
  ): Promise<accountsQueueData> {
    const now = Date.now();
    const tokenExpiration = new Date(data.payload.token_expiration).getTime();

    if (tokenExpiration < now) {
      const refreshData = await this.refreshAccessToken(
        data.payload.refresh_token,
      );
      this.updateTokenData(data, refreshData);
    }
    return data;
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
    try {
      const q = await fetch('https://api.twitter.com/2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors',
        body: new URLSearchParams({
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
          client_id: clientId,
        }),
      });

      const data = await q.json();
      if (data !== undefined && !data.error) {
        return data;
      }
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  updateTokenData(data: accountsQueueData, newData): void {
    data.access_token = newData.access_token;
    data.payload.refresh_token = newData.refresh_token;
    const expiration_time = new Date(
      Date.now() + newData.expires_in * 1000,
    ).toUTCString();
    data.payload.token_expiration = new Date(expiration_time);
    this.accountsService.updateWithAccountsQueueData(data);
  }

  async getUserTweets(userId: string, sinceId: string, next: string) {
    try {
      return await this.client.tweets.usersIdTweets(userId, {
        max_results: 5,
        since_id: sinceId,
        pagination_token: next,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getTweetLikesContributors(tweetId: string, next: string) {
    try {
      return await this.client.users.tweetsIdLikingUsers(tweetId, {
        max_results: 100,
        'tweet.fields': ['created_at'],
        'user.fields': this.userFields,
        pagination_token: next,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getTweetQuotesContributors(tweetId: string, next: string) {
    try {
      return await this.client.tweets.findTweetsThatQuoteATweet(tweetId, {
        max_results: 100,
        'tweet.fields': ['created_at'],
        'user.fields': this.userFields,
        pagination_token: next,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getTweetRepliesContributors(tweetId: string, next: string) {
    try {
      return await this.client.tweets.tweetsRecentSearch({
        query: 'conversation_id:' + tweetId,
        max_results: 100,
        'tweet.fields': ['created_at'],
        'user.fields': this.userFields,
        pagination_token: next,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getTweetRetweetsContributors(tweetId: string, next: string) {
    try {
      return await this.client.users.tweetsIdRetweetingUsers(tweetId, {
        max_results: 100,
        'tweet.fields': ['created_at'],
        'user.fields': this.userFields,
        pagination_token: next,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
