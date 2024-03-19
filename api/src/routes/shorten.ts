import { FastifyInstance } from 'fastify';
import { ShortenServiceImpl } from '../services/shorten.service';
import { ShortenController } from '../controllers/shorten.controller';
import { RedirectService } from '../services/redirect.service';
import { StorageFactory } from '../services/storage.factory';
import { UrlFormatter } from '../services/url.formatter';

export default async function shortenRoutes(app: FastifyInstance) {
  const storageService = StorageFactory.createStorageService();
  const urlFormatter = new UrlFormatter();
  const redirectService = new RedirectService(storageService, urlFormatter);
  const shortenService = new ShortenServiceImpl(redirectService);
  const shortenController = new ShortenController(shortenService);

  app.addHook('onRequest', (request, reply, done) => {
    const userAgent = request.headers['user-agent'];
    const isValidUserAgent =
      /^(Mozilla|Opera|Chrome|Safari|Edge|MSIE|PostmanRuntime)/.test(
        userAgent || '',
      );

    if (!isValidUserAgent) {
      reply.code(400).send('Invalid User Agent');
    } else {
      done();
    }
  });

  app.post('/shorten', async (request, reply) => {
    return await shortenController.shorten(request, reply);
  });

  app.get<{ Params: { shortUrl: string } }>(
    '/:shortUrl',
    async (request, reply) => {
      await shortenController.redirect(request, reply);
    },
  );

  app.get<{ Params: { shortUrl: string } }>(
    '/stats/:shortUrl',
    async (request, reply) => {
      const stats = await shortenController.getStats(request);
      reply.send(stats);
    },
  );
}
