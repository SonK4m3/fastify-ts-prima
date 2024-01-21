import prisma from "../../utils/prisma";
import { CreateBookInput, CreateBookLanguageInput } from "./book.schema";

export async function createBookLanguage(data: CreateBookLanguageInput) {
  return prisma.bookLanguage.create({
    data,
  });
}

export async function getBookLanguage() {
  return prisma.bookLanguage.findMany();
}

export async function createBook(
  data: CreateBookInput & { languageId: number }
) {
  return prisma.book.create({ data });
}

export async function getBook() {
  return prisma.book.findMany({
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

export async function getBooks() {
  return prisma.book.findMany();
}
