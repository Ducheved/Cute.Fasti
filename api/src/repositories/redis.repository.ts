import { RedisClientType } from '@redis/client';
import { RedisConfig } from '../config';

export class RedisRepository {
  private client: RedisClientType;
  private prefix: string;

  constructor(config: RedisConfig, client: RedisClientType) {
    this.client = client;
    this.prefix = config.prefix || '';
  }

  private key(name: string): string {
    return `${this.prefix}:${name}`;
  }

  async saveURL(
    shortUrl: string,
    originalUrl: string,
    expiration: number,
    maxClicks: string,
  ): Promise<void> {
    const key = this.key(shortUrl);
    await this.client
      .multi()
      .set(key, originalUrl, { EX: expiration })
      .set(`${key}:clicks`, maxClicks, { EX: expiration })
      .set(`${key}:visits`, '0', { EX: expiration })
      .exec();
  }

  async decrementClicks(shortUrl: string): Promise<number | null> {
    const clicksKey = this.key(`${shortUrl}:clicks`);
    const maxClicks = await this.client.get(clicksKey);
    if (maxClicks === '0') {
      return null;
    }
    return await this.client.decr(clicksKey);
  }

  async getClicks(shortUrl: string): Promise<number | null> {
    const clicks = await this.client.get(this.key(`${shortUrl}:clicks`));
    return clicks ? parseInt(clicks, 10) : null;
  }

  async deleteURL(shortUrl: string): Promise<void> {
    const key = this.key(shortUrl);
    await this.client.del([key, `${key}:clicks`, `${key}:visits`]);
  }

  async getURL(shortUrl: string): Promise<string | null> {
    return await this.client.get(this.key(shortUrl));
  }

  async incrementVisits(shortUrl: string): Promise<number> {
    return await this.client.incr(this.key(`${shortUrl}:visits`));
  }

  async getVisits(shortUrl: string): Promise<number | null> {
    const visits = await this.client.get(this.key(`${shortUrl}:visits`));
    return visits ? parseInt(visits, 10) : null;
  }
}
