/*
  Warnings:

  - Added the required column `author` to the `Volumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Volumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Volumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Volumes" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "publisher" TEXT NOT NULL;
