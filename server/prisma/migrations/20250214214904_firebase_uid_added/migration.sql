/*
  Warnings:

  - A unique constraint covering the columns `[firebaseUId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseUId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "firebaseUId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_firebaseUId_key" ON "Users"("firebaseUId");
