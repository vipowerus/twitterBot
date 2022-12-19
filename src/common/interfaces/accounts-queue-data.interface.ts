export interface accountsQueueData {
  access_token: string;
  payload: {
    id: string;
    refresh_token: string;
    token_expiration: Date;
    last_scanned_at: Date;
    max_scanned_content_id: string;
    platform_id: string;
  };
}
