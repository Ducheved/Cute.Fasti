export interface ShortenRequest {
  urls: string[];
  command: string;
  expiration: number;
  maxClicks: string;
  customPrefix: string;
  hashLength: number;
}

export interface ShortenResponse {
  shortUrls: { originalUrl?: string; shortUrl?: string }[];
  elapsedTime?: number;
}
