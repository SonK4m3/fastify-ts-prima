import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const bookLanguageCore = {
  languageCode: z.string(),
  languageName: z.string(),
};

const createBookLanguageSchema = z.object({ ...bookLanguageCore });

const bookLanguageResponseSchema = z.object({
  id: z.number(),
  ...bookLanguageCore,
});

const bookInput = {
  title: z.string(),
  numberPages: z.number(),
  publicationDate: z.string(),
};

const createBookSchema = z.object({
  ...bookInput,
});

const bookResponseSchema = z.object({
  id: z.number(),
  ...bookInput,
});

const booksResponseSchema = z.array(bookResponseSchema);

export type CreateBookLanguageInput = z.infer<typeof createBookLanguageSchema>;
export type CreateBookInput = z.infer<typeof createBookSchema>;

export const { schemas: bookSchemas, $ref } = buildJsonSchemas(
  {
    createBookLanguageSchema,
    bookLanguageResponseSchema,
    createBookSchema,
    bookResponseSchema,
    booksResponseSchema,
  },
  {
    $id: "bookSchemas",
  }
);
