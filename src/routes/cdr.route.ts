import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import CdrController from '../controllers/cdr.controller';
import { $ref, CdrIdType } from '../validators/cdr.schema';

const cdrController = new CdrController();

const cdrRoutes = async (server: FastifyInstance) => {
  server.get(
    '/:id/:uuid/:created_at',
    {
      schema: {
        response: {
          200: $ref('cdrSchema'),
        },
      },
    },
    (request: FastifyRequest<{ Params: CdrIdType }>, reply: FastifyReply) =>
      cdrController.findByIdHandler(request, reply),
  );

  server.get(
    '/',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            start: {
              type: 'number',
            },
            limit: {
              type: 'number',
            },
          },
          required: ['start', 'limit'],
        },
        response: {
          200: $ref('cdrsResponsesSchema'),
        },
      },
    },
    (request: FastifyRequest<{ Querystring: { start: number; limit: number } }>, reply: FastifyReply) =>
      cdrController.getAllCdrsHandler(request, reply),
  );
};

export default cdrRoutes;
