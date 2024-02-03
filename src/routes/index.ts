import { FastifyInstance, FastifyRequest } from 'fastify';
import userRoutes from './user.route';
import productRoutes from './product.route';
import bookRoutes from './book.route';

import { userSchemas } from '../validators/user.schema';
import { productSchemas } from '../validators/product.schema';
import { bookSchemas } from '../validators/book.schema';
import fooRoutes from './foo.route';

type Role = 'admin' | 'user';

const routes = async (server: FastifyInstance) => {
  for (const schema of [...userSchemas, ...productSchemas, ...bookSchemas]) {
    server.addSchema(schema);
  }

  //authorization
  server.addHook('onRequest', async (request: FastifyRequest<{}>, reply) => {
    const routePath = request.routeOptions.url;

    const nonAuthenticatedRoutes: { route: string; method?: string }[] = [
      { route: '/api/users/login', method: 'POST' },
      { route: '/api/users', method: 'POST' },
    ];

    if (nonAuthenticatedRoutes.some((it) => it.route === routePath && it.method === request.raw.method)) {
      return;
    }

    // Verify JWT
    await request.jwtVerify();
  });

  // register sub-routes
  server.register(fooRoutes, { prefix: '/foo' });
  server.register(userRoutes, { prefix: '/users' });
  server.register(productRoutes, { prefix: '/products' });
  server.register(bookRoutes, { prefix: '/books' });
};

export default routes;
