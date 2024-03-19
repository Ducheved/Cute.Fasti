import { ShortenRequest } from '../types';

export function validateShortenRequest(
  request: any,
): request is ShortenRequest {
  if (!request || typeof request !== 'object') {
    return false;
  }

  const { urls, command, expiration, maxClicks, customPrefix, hashLength } =
    request;

  if (
    !Array.isArray(urls) ||
    urls.length === 0 ||
    urls.some((url) => typeof url !== 'string')
  ) {
    return false;
  }

  if (typeof command !== 'string' || !['short', 'nyart'].includes(command)) {
    return false;
  }

  if (typeof expiration !== 'number' || expiration < 1 || expiration > 262800) {
    return false;
  }

  if (
    maxClicks !== undefined &&
    (typeof maxClicks !== 'string' || !/^\d+$/.test(maxClicks))
  ) {
    return false;
  }

  if (
    customPrefix !== undefined &&
    (typeof customPrefix !== 'string' || customPrefix.length > 12)
  ) {
    return false;
  }

  if (
    hashLength !== undefined &&
    (typeof hashLength !== 'number' || hashLength < 2 || hashLength > 8)
  ) {
    return false;
  }

  return true;
}
