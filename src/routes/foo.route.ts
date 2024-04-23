import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const fooRoutes = async (server: FastifyInstance) => {
  server.get('/404', (request, reply) => {
    reply.status(404).send({ message: '404' });
  });

  server.get('/500', (request, reply) => {
    throw new Error('500 error');
  });

  server.get(
    '/param/:ids',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
            },
          },
          required: ['id'],
        },
      },
    },
    (
      request: FastifyRequest<{
        Params: {
          ids: number;
        };
        Querystring: {
          id: number;
        };
      }>,
      reply,
    ) => {
      reply.send({ user: request.user, queryString: request.query.id, params: request.params });
    },
  );

  server.get(
    '/admin/param/:ids',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
            },
          },
          required: ['id'],
        },
      },
      config: {
        allowedRoles: ['admin'],
      },
      preHandler: [server.authorize],
    },
    (
      request: FastifyRequest<{
        Params: {
          ids: number;
        };
        Querystring: {
          id: number;
        };
      }>,
      reply,
    ) => {
      reply.send({ user: request.user, queryString: request.query.id, params: request.params });
    },
  );

  server.get(
    '/permission/read',
    {
      config: {
        permission: 'read',
      },
      preHandler: [server.permission],
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      reply.send({ user: request.user, message: 'The user can read' });
    },
  );

  server.get(
    '/permission/write',
    {
      config: {
        permission: 'write',
      },
      preHandler: [server.permission],
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      reply.send({ user: request.user, message: 'The user can write' });
    },
  );

  server.get(
    '/permission/delete',
    {
      config: {
        permission: 'delete',
      },
      preHandler: [server.permission],
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      reply.send({ user: request.user, message: 'The user can delete' });
    },
  );
};

export default fooRoutes;
