-- CreateEnum
CREATE TYPE "CollectionStatus" AS ENUM ('Owned', 'Want_To_Buy', 'For_Sale');

-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Manga" (
    "mangaId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "coverImageUrl" TEXT NOT NULL,
    "booksApiId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("mangaId")
);

-- CreateTable
CREATE TABLE "Volumes" (
    "volumeId" SERIAL NOT NULL,
    "mangaId" INTEGER NOT NULL,
    "volumeNumber" INTEGER NOT NULL,
    "isbn" TEXT,
    "releaseDate" TIMESTAMP(3),
    "coverImageUrl" TEXT NOT NULL,

    CONSTRAINT "Volumes_pkey" PRIMARY KEY ("volumeId")
);

-- CreateTable
CREATE TABLE "UserCollection" (
    "userCollectionId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "volumeId" INTEGER NOT NULL,
    "status" "CollectionStatus" NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "UserCollection_pkey" PRIMARY KEY ("userCollectionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manga_booksApiId_key" ON "Manga"("booksApiId");

-- AddForeignKey
ALTER TABLE "Volumes" ADD CONSTRAINT "Volumes_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("mangaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_volumeId_fkey" FOREIGN KEY ("volumeId") REFERENCES "Volumes"("volumeId") ON DELETE CASCADE ON UPDATE CASCADE;
