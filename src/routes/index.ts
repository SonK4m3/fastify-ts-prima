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

    if (routePath === '/api/users/login' && request.raw.method === 'POST') {
      return;
    }

    // Verify JWT
    await request.jwtVerify();
  });

  // register sub-routes
  server.register(fooRoutes, { prefix: '/foo' });
  server.register(userRoutes, { prefix: '/users' });
  server.register(productRoutes, { prefix: '/products', roles: ['admin'] });
  server.register(bookRoutes, { prefix: '/books', roles: ['user'] });
};

const hasRequiredRoles = (userRoles: string[], requiredRoles: string[]): boolean => {
  return requiredRoles.every((role) => userRoles.includes(role));
};

export default routes;
