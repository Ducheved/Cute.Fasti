import { ShortenService } from './shorten.interface';
import { ShortenResponse, StatsResponse } from '../types';
import { RedirectService } from './redirect.service';
import { isValidUrl } from '../utils';
import { ShortenRequest as ValidatedShortenRequest } from '../schemas/shorten.schema';

export class ShortenServiceImpl implements ShortenService {
  private redirectService: RedirectService;

  constructor(redirectService: RedirectService) {
    this.redirectService = redirectService;
  }

  async shorten(request: ValidatedShortenRequest): Promise<ShortenResponse> {
    const {
      urls,
      command,
      expiration,
      maxClicks = '0',
      customPrefix = '0',
      hashLength = 4,
    } = request;

    if (parseInt(maxClicks) > 2147483647)
      throw new Error('Max clicks is too large');
    if (hashLength < 2 || hashLength > 8)
      throw new Error('Hash length must be between 2 and 8');
    if (customPrefix.length > 12) throw new Error('Custom prefix is too long');
    if (expiration > 15768000) throw new Error('Expiration is too long');

    const shortUrls: ShortenResponse = { shortUrls: [] };
    const startTime = process.hrtime.bigint();

    for (const url of urls) {
      const isValid = await isValidUrl(url);
      if (!isValid) {
        throw new Error('Invalid URL: ' + url);
      }
      const shortUrl = await this.redirectService.getShortUrl(
        url,
        command,
        expiration,
        maxClicks,
        customPrefix,
        hashLength,
      );
      shortUrls.shortUrls.push({ originalUrl: url, shortUrl });
    }

    const endTime = process.hrtime.bigint();
    const elapsedTime = Number(endTime - startTime) / 1e6;

    return { ...shortUrls, elapsedTime };
  }

  async redirect(shortUrl: string): Promise<string | null> {
    return await this.redirectService.redirectUrl(shortUrl);
  }

  async getStats(shortUrl: string): Promise<StatsResponse> {
    const stats = await this.redirectService.getUrlStats(shortUrl);

    if (stats) {
      return { ...stats, shortUrl };
    } else {
      throw new Error('Not found');
    }
  }
}
