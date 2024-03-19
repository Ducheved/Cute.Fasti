import { HashService } from './hash.service';
import { StorageService } from './storage.interface';
import { UrlFormatter } from './url.formatter';

export class RedirectService {
  private hashService: HashService;
  private storageService: StorageService;
  private urlFormatter: UrlFormatter;

  constructor(storageService: StorageService, urlFormatter: UrlFormatter) {
    this.hashService = new HashService();
    this.storageService = storageService;
    this.urlFormatter = urlFormatter;
  }

  async getShortUrl(
    url: string,
    command: string,
    expiration: number,
    maxClicks: string,
    customPrefix: string,
    hashLength: number,
  ): Promise<string> {
    let hash = this.hashService.generateHash(hashLength);
    let shortUrl = this.urlFormatter.generateShortUrl(
      command,
      hash,
      customPrefix,
    );

    while (await this.storageService.getURL(shortUrl)) {
      hash = this.hashService.generateHash(hashLength);
      shortUrl = this.urlFormatter.generateShortUrl(
        command,
        hash,
        customPrefix,
      );
    }

    await this.storageService.saveURL(shortUrl, url, expiration, maxClicks);
    return shortUrl;
  }

  async redirectUrl(shortUrl: string): Promise<string | null> {
    const url = await this.storageService.getURL(shortUrl);
    if (url) {
      const clicksLeft = await this.storageService.decrementClicks(shortUrl);
      if (clicksLeft !== null && clicksLeft <= 0) {
        await this.storageService.deleteURL(shortUrl);
      } else {
        await this.storageService.incrementVisits(shortUrl);
      }
    }
    return url;
  }

  async getUrlStats(
    shortUrl: string,
  ): Promise<{ clicks: number; visits: number } | null> {
    const clicks = await this.storageService.getClicks(shortUrl);
    const visits = await this.storageService.getVisits(shortUrl);
    return clicks !== null && visits !== null ? { clicks, visits } : null;
  }
}
