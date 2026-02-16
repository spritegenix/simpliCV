-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('DRAFT', 'FINALIZED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "educations" ALTER COLUMN "isPresent" DROP NOT NULL,
ALTER COLUMN "isPresent" DROP DEFAULT,
ALTER COLUMN "isPresent" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "columnLayout" TEXT NOT NULL DEFAULT 'double',
ADD COLUMN     "fontFamily" TEXT NOT NULL DEFAULT 'inter',
ADD COLUMN     "letterSpacing" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "lineHeight" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
ADD COLUMN     "margins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "photoShape" TEXT NOT NULL DEFAULT 'square',
ADD COLUMN     "sectionConfigs" JSONB DEFAULT '{}',
ADD COLUMN     "showPhoto" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "titleAlign" TEXT NOT NULL DEFAULT 'left';

-- CreateTable
CREATE TABLE "OfferLetter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "OfferStatus" NOT NULL DEFAULT 'DRAFT',
    "content" JSONB NOT NULL,
    "design" JSONB,
    "styleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferLetter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OfferLetter_userId_idx" ON "OfferLetter"("userId");
