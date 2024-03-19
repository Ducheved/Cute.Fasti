export interface ShortenRequest {
  urls: string[];
  command: 'short' | 'nyart';
  expiration: number;
  maxClicks?: string;
  customPrefix?: string;
  hashLength?: number;
}

export interface ShortenResponse {
  shortUrls: { originalUrl: string; shortUrl: string }[];
  elapsedTime?: number;
}

export interface StatsResponse {
  shortUrl: string;
  clicks: number;
}
