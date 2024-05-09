import { FastifyInstance } from 'fastify';
import roleRoutes from './role.route';
import permissionRoutes from './permission.route';

const rbacRoutes = async (server: FastifyInstance) => {
  server.register(roleRoutes, { prefix: '/roles' });
  server.register(permissionRoutes, { prefix: '/permissions' });
};

export default rbacRoutes;
