-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('DRAFT', 'FINALIZED', 'ARCHIVED');

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
