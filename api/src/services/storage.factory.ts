import { RedisService } from './redis.service';
import { StorageService } from './storage.interface';
import { config } from '../config';

export class StorageFactory {
  static createStorageService(): StorageService {
    return RedisService.getInstance(config.redis);
  }
}
