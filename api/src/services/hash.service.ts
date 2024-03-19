import crypto from 'crypto';

export class HashService {
  generateHash(length: number): string {
    return crypto.randomBytes(length / 2).toString('hex');
  }
}
