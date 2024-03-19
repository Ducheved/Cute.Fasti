import { config } from '../config';

export class UrlFormatter {
  generateShortUrl(
    command: string,
    hash: string,
    customPrefix: string,
  ): string {
    const prefix =
      customPrefix === '0' || !customPrefix
        ? config.defaultPrefix
        : customPrefix;
    return command === 'nyart' ? `${prefix}-${hash}` : `${prefix}${hash}`;
  }
}
