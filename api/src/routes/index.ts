import { FastifyInstance } from 'fastify';
import shortenRoutes from './shorten';

export default async function routes(app: FastifyInstance) {
  app.register(shortenRoutes, { prefix: '' });
}
