import BookRepository from '../repositories/book.repository';
import { convertToISO8601 } from '../utils/formater';
import prisma from '../utils/prisma';
import { CreateBookInput, CreateBookLanguageInput } from '../validators/book.schema';

class BookService {
  constructor(readonly bookRepository: BookRepository) {}

  async createBookLanguage(data: CreateBookLanguageInput) {
    return await this.bookRepository.createBookLanguage(data);
  }

  async getBookLanguage() {
    return await prisma.bookLanguage.findMany();
  }

  async createBook(data: CreateBookInput & { languageId: number }) {
    const publiccationDate = convertToISO8601(data.publicationDate);
    if (publiccationDate) {
      data.publicationDate = publiccationDate;
      return await this.bookRepository.createBook(data);
    } else {
      throw new Error('Invalid date format');
    }
  }

  async getBook() {
    return await this.bookRepository.getBook();
  }

  async getBooks() {
    return await this.bookRepository.getBooks();
  }
}

export default BookService;
