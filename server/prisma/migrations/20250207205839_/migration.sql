/*
  Warnings:

  - You are about to drop the column `mangaId` on the `Volumes` table. All the data in the column will be lost.
  - You are about to drop the `Manga` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `booksApiId` to the `Volumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesName` to the `Volumes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Volumes" DROP CONSTRAINT "Volumes_mangaId_fkey";

-- AlterTable
ALTER TABLE "Volumes" DROP COLUMN "mangaId",
ADD COLUMN     "booksApiId" TEXT NOT NULL,
ADD COLUMN     "seriesName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Manga";
