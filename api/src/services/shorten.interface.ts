import { ShortenRequest, ShortenResponse, StatsResponse } from '../types';

export interface ShortenService {
  shorten(request: ShortenRequest): Promise<ShortenResponse>;
  redirect(shortUrl: string): Promise<string | null>;
  getStats(shortUrl: string): Promise<StatsResponse>;
}
