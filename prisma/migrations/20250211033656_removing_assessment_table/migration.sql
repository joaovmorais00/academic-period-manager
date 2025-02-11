/*
  Warnings:

  - You are about to drop the column `assessmentActivityId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `assessment_ActivityId` on the `Meet` table. All the data in the column will be lost.
  - You are about to drop the `AssessmentActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_assessmentActivityId_fkey";

-- DropForeignKey
ALTER TABLE "AssessmentActivity" DROP CONSTRAINT "AssessmentActivity_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "AssessmentActivity" DROP CONSTRAINT "AssessmentActivity_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Meet" DROP CONSTRAINT "Meet_assessment_ActivityId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "assessmentActivityId";

-- AlterTable
ALTER TABLE "Meet" DROP COLUMN "assessment_ActivityId",
ADD COLUMN     "testId" TEXT;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "link" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'TEST';

-- DropTable
DROP TABLE "AssessmentActivity";

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;
