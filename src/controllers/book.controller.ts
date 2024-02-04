import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateBookInput, CreateBookLanguageInput } from '../validators/book.schema';
import BookRepository from '../repositories/book.repository';
import BookService from '../services/book.services';

const bookRepository: BookRepository = new BookRepository();
const bookService: BookService = new BookService(bookRepository);

class BookController {
  constructor() {}

  createBookLanguageHandler = async (
    request: FastifyRequest<{ Body: CreateBookLanguageInput }>,
    reply: FastifyReply,
  ) => {
    const bookLanguage = await bookService.createBookLanguage({
      ...request.body,
    });

    return bookLanguage;
  };

  createBookHandler = async (
    request: FastifyRequest<{
      Body: CreateBookInput;
      Querystring: {
        languageId: number;
      };
    }>,
    reply: FastifyReply,
  ) => {
    const book = await bookService.createBook({
      ...request.body,
      languageId: request.query.languageId,
    });

    return book;
  };

  getBookLanguageHandler = async () => {
    const bl = await bookService.getBookLanguage();
    return bl;
  };

  getBooksHandler = async () => {
    const books = await bookService.getBooks();
    return books;
  };
}

export default BookController;
