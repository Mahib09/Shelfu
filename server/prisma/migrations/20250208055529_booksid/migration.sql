/*
  Warnings:

  - A unique constraint covering the columns `[booksApiId]` on the table `Volumes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Volumes_booksApiId_key" ON "Volumes"("booksApiId");
