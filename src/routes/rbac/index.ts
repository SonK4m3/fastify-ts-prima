import { FastifyInstance } from 'fastify';
import roleRoutes from './role.route';

const rbacRoutes = async (server: FastifyInstance) => {
  server.register(roleRoutes, { prefix: '/roles' });
  server.register(roleRoutes, { prefix: '/permissions' });
};

export default rbacRoutes;
