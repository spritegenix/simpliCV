/*
  Warnings:

  - The `isPresent` column on the `educations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "educations" DROP COLUMN "isPresent",
ADD COLUMN     "isPresent" BOOLEAN NOT NULL DEFAULT false;
