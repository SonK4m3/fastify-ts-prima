import { FastifyInstance } from "fastify";
import {
  createBookHandler,
  createBookLanguageHandler,
  getBookLanguageHandler,
  getBooksHandler,
} from "./book.controller";
import { $ref } from "./book.schema";

export const bookRoutes = async (server: FastifyInstance) => {
  server.post(
    "/bookLanguages",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createBookLanguageSchema"),
        response: { 201: $ref("bookLanguageResponseSchema") },
      },
    },
    createBookLanguageHandler
  );

  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createBookSchema"),
        response: { 201: $ref("booksResponseSchema") },
      },
    },
    createBookHandler
  );

  server.get(
    "/bookLanguages",
    {
      schema: {
        response: { 200: $ref("bookLanguageResponseSchema") },
      },
    },
    getBookLanguageHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: { 200: $ref("booksResponseSchema") },
      },
    },
    getBooksHandler
  );
};
