/*
  Warnings:

  - You are about to drop the column `booksApiId` on the `Volumes` table. All the data in the column will be lost.
  - You are about to drop the column `seriesName` on the `Volumes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Volumes" DROP COLUMN "booksApiId",
DROP COLUMN "seriesName";
