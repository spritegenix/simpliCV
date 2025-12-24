-- AlterTable
ALTER TABLE "educations" ADD COLUMN     "isPresent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "dateFormat" TEXT,
ADD COLUMN     "sectionOrder" TEXT[] DEFAULT ARRAY[]::TEXT[];
