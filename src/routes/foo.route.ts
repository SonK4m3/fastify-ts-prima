import { FastifyInstance, FastifyRequest } from 'fastify';

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
};

export default fooRoutes;
