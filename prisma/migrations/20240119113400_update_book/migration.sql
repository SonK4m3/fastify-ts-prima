-- CreateTable
CREATE TABLE "BookLanguage" (
    "id" SERIAL NOT NULL,
    "languageCode" VARCHAR(25) NOT NULL,
    "languageName" VARCHAR(255) NOT NULL,

    CONSTRAINT "BookLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "numberPages" INTEGER NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "BookLanguage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
