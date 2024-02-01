import { FastifyInstance, FastifyRequest } from 'fastify';
import BookController from '../controllers/book.controller';
import { $ref, CreateBookLanguageInput, CreateBookInput } from '../validators/book.schema';
import { FastifyReply } from 'fastify/types/reply';

const bookController = new BookController();
const bookRoutes = async (server: FastifyInstance) => {
  server.post(
    '/bookLanguages',
    {
      schema: { body: $ref('createBookLanguageSchema'), response: { 201: $ref('bookLanguageResponseSchema') } },
    },
    (request: FastifyRequest<{ Body: CreateBookLanguageInput }>, reply: FastifyReply) =>
      bookController.createBookLanguageHandler(request, reply),
  );

  server.post(
    '/',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            languageId: { type: 'number' },
          },
          required: ['languageId'],
        },
        body: $ref('createBookSchema'),
        response: { 201: $ref('booksResponseSchema') },
      },
    },
    (
      request: FastifyRequest<{
        Body: CreateBookInput;
        Querystring: {
          languageId: number;
        };
      }>,
      reply: FastifyReply,
    ) => bookController.createBookHandler(request, reply),
  );

  server.get(
    '/bookLanguages',
    { schema: { response: { 200: $ref('bookLanguageResponseSchema') } } },
    bookController.getBookLanguageHandler,
  );

  server.get('/', { schema: { response: { 200: $ref('booksResponseSchema') } } }, bookController.getBooksHandler);
};

export default bookRoutes;
