import { FastifyReply, FastifyRequest } from "fastify";
import { CreateBookInput, CreateBookLanguageInput } from "./book.schema";
import {
  createBook,
  createBookLanguage,
  getBookLanguage,
  getBooks,
} from "./book.service";

export const createBookLanguageHandler = async (
  request: FastifyRequest<{ Body: CreateBookLanguageInput }>,
  reply: FastifyReply
) => {
  try {
    const bookLanguage = await createBookLanguage({
      ...request.body,
    });

    return bookLanguage;
  } catch (err) {
    console.log(err);
    return reply.status(500);
  }
};

export const createBookHandler = async (
  request: FastifyRequest<{
    Body: CreateBookInput;
    Params: {
      languageId: number;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const book = await createBook({
      ...request.body,
      languageId: request.params.languageId,
    });

    return book;
  } catch (err) {
    console.log(err);
    return reply.status(500);
  }
};

export const getBookLanguageHandler = async () => {
  const bl = await getBookLanguage();
  return bl;
};

export const getBooksHandler = async () => {
  const books = await getBooks();
  return books;
};
