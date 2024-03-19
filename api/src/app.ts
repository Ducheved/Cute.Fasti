import 'dotenv/config';
import fastify, { FastifyInstance } from 'fastify';
import routes from './routes';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import compress from '@fastify/compress';

async function createServer() {
  const app: FastifyInstance = fastify();
  await app.register(compress, { global: true });
  await app.register(helmet);
  let corsOrigins = ['http://localhost'];
  if (process.env.CORS_ORIGIN) {
    console.log('process.env.CORS_ORIGIN', process.env.CORS_ORIGIN);
    corsOrigins = process.env.CORS_ORIGIN.split(',');
  }
  await app.register(cors, { origin: corsOrigins });
  await app.register(rateLimit, {
    global: true,
    max: 100,
    ban: 1,
    timeWindow: '1 minute',
    addHeadersOnExceeding: {
      'x-ratelimit-limit': false,
      'x-ratelimit-remaining': false,
      'x-ratelimit-reset': false,
    },
    addHeaders: {
      'x-ratelimit-limit': false,
      'x-ratelimit-remaining': false,
      'x-ratelimit-reset': false,
      'retry-after': true,
    },
  });
  await app.register(routes);
  return app;
}

createServer().then((app) => {
  const PORT = Number(process.env.PORT) || 3000;
  const ADDRESS = String(process.env.ADDRESS) || '0.0.0.0';

  app.listen({ host: ADDRESS, port: PORT }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
});
