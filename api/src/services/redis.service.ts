import { createClient, RedisClientType } from '@redis/client';
import { StorageService } from './storage.interface';
import { RedisConfig } from '../config';
import { RedisRepository } from '../repositories/redis.repository';

export class RedisService implements StorageService {
  private static instance: RedisService;
  private redisRepository: RedisRepository;

  private constructor(config: RedisConfig) {
    const redisUrl = `redis://${config.user || ''}:${encodeURIComponent(config.password || '')}@${config.address || ''}:${config.port || ''}`;
    const client = createClient({ url: redisUrl });
    client.on('error', (err) => console.error('Redis Client Error', err));
    client.connect();
    this.redisRepository = new RedisRepository(
      config,
      client as RedisClientType,
    );
  }

  public static getInstance(config: RedisConfig): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService(config);
    }
    return RedisService.instance;
  }

  async saveURL(
    shortUrl: string,
    originalUrl: string,
    expiration: number,
    maxClicks: string,
  ): Promise<void> {
    await this.redisRepository.saveURL(
      shortUrl,
      originalUrl,
      expiration,
      maxClicks,
    );
  }

  async decrementClicks(shortUrl: string): Promise<number | null> {
    return await this.redisRepository.decrementClicks(shortUrl);
  }

  async getClicks(shortUrl: string): Promise<number | null> {
    return await this.redisRepository.getClicks(shortUrl);
  }

  async deleteURL(shortUrl: string): Promise<void> {
    await this.redisRepository.deleteURL(shortUrl);
  }

  async getURL(shortUrl: string): Promise<string | null> {
    return await this.redisRepository.getURL(shortUrl);
  }

  async incrementVisits(shortUrl: string): Promise<number> {
    return await this.redisRepository.incrementVisits(shortUrl);
  }

  async getVisits(shortUrl: string): Promise<number | null> {
    return await this.redisRepository.getVisits(shortUrl);
  }
}
