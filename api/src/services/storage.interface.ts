export interface StorageService {
  saveURL(
    shortUrl: string,
    originalUrl: string,
    expiration: number,
    maxClicks: string,
  ): Promise<void>;
  decrementClicks(shortUrl: string): Promise<number | null>;
  getClicks(shortUrl: string): Promise<number | null>;
  deleteURL(shortUrl: string): Promise<void>;
  getURL(shortUrl: string): Promise<string | null>;
  incrementVisits(shortUrl: string): Promise<number>;
  getVisits(shortUrl: string): Promise<number | null>;
}
