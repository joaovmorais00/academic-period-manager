-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_subjectId_fkey";

-- AlterTable
ALTER TABLE "Test" ALTER COLUMN "subjectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
