import { FastifyRequest } from 'fastify';
import { ShortenService } from '../services/shorten.interface';
import { ShortenResponse, StatsResponse } from '../types';
import { validateShortenRequest } from '../utils/validators';

export class ShortenController {
  private shortenService: ShortenService;

  constructor(shortenService: ShortenService) {
    this.shortenService = shortenService;
  }

  async shorten(
    request: FastifyRequest,
    reply: any,
  ): Promise<ShortenResponse | void> {
    const validatedRequest = validateShortenRequest(request.body)
      ? request.body
      : null;
    if (!validatedRequest) {
      reply.status(400).send('Invalid request body');
      return;
    }
    return await this.shortenService.shorten(validatedRequest);
  }

  async redirect(
    request: FastifyRequest<{ Params: { shortUrl: string } }>,
    reply: any,
  ) {
    const { shortUrl } = request.params;
    const originalUrl = await this.shortenService.redirect(shortUrl);

    if (originalUrl) {
      reply.redirect(originalUrl);
    } else {
      reply.status(404).send('Not found');
    }
  }

  async getStats(
    request: FastifyRequest<{ Params: { shortUrl: string } }>,
  ): Promise<StatsResponse> {
    const { shortUrl } = request.params;
    return await this.shortenService.getStats(shortUrl);
  }
}
