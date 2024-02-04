import prisma from '../prisma';
import { CreateBookInput, CreateBookLanguageInput } from '../validators/book.schema';

class BookRepository {
  constructor() {}

  async createBookLanguage(data: CreateBookLanguageInput) {
    return await prisma.bookLanguage.create({
      data,
    });
  }

  async getBookLanguage() {
    return await prisma.bookLanguage.findMany();
  }

  async createBook(data: CreateBookInput & { languageId: number }) {
    return await prisma.book.create({ data });
  }

  async getBook() {
    return await prisma.book.findMany({
      select: {
        id: true,
        numberPages: true,
        title: true,
        publicationDate: true,
        language: {
          select: {
            id: true,
            languageCode: true,
            languageName: true,
          },
        },
      },
    });
  }

  async getBooks() {
    return await prisma.book.findMany();
  }
}

export default BookRepository;
