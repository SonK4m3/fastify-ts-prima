import { FastifyInstance, FastifyRequest } from 'fastify';
import authRoutes from './auth.route';
import { userSchemas } from '../validators/user.schema';
import fooRoutes from './foo.route';
import { cdrSchemas } from '../validators/cdr.schema';
import cdrRoutes from './cdr.route';

const routes = async (server: FastifyInstance) => {
  for (const schema of [...userSchemas, ...cdrSchemas]) {
    server.addSchema(schema);
  }

  //authorization
  server.addHook('onRequest', async (request: FastifyRequest<{}>, reply) => {
    const routePath = request.routeOptions.url;

    const nonAuthenticatedRoutes: { route: string; method?: string }[] = [
      { route: '/api/auth/login', method: 'POST' },
      { route: '/api/auth/signup', method: 'POST' },
    ];

    if (nonAuthenticatedRoutes.some((it) => it.route === routePath && it.method === request.raw.method)) {
      return;
    }

    // Verify JWT
    await request.jwtVerify();
  });

  // register sub-routes
  server.register(fooRoutes, { prefix: '/foo' });
  server.register(authRoutes, { prefix: '/auth' });
  server.register(cdrRoutes, { prefix: '/cdr' });
};

export default routes;
