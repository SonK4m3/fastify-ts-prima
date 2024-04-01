import fastifyPlugin from 'fastify-plugin';
import fastifyAuth, { FastifyAuthPluginOptions } from '@fastify/auth';
import { FastifyRequest, FastifyReply, FastifyInstance, errorCodes } from 'fastify';

export default fastifyPlugin<FastifyAuthPluginOptions>(async (fastify: FastifyInstance) => {
  fastify.register(fastifyAuth);

  fastify.decorate('authorize', async (request: FastifyRequest, reply: FastifyReply) => {
    // declare type in src/index.ts line 23
    const allowedRoles = request.routeOptions.config.allowedRoles;

    if (allowedRoles && request.user) {
      const userRoles: string[] = request.user ? [request.user.role] : [];
      if (!allowedRoles?.some((role: string) => userRoles.includes(role))) {
        throw new errorCodes.FST_ERR_REP_INVALID_PAYLOAD_TYPE();
      }
    }
  });
});
