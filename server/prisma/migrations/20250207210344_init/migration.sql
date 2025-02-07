/*
  Warnings:

  - Added the required column `booksApiId` to the `Volumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesName` to the `Volumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Volumes" ADD COLUMN     "booksApiId" TEXT NOT NULL,
ADD COLUMN     "seriesName" TEXT NOT NULL;
