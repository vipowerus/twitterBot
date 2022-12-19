export interface profileData {
  id: string;
  createdAt: Date;
  description: string;
  location: string;
  name: string;
  pinned_tweet_id: string;
  profile_image_url: string;
  protected: boolean;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
  url: string;
  verified: boolean;
}
