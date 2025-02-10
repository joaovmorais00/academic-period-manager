/*
  Warnings:

  - You are about to drop the `Assessment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('CLASS', 'STUDY_TIME');

-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_subjectId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "assessmentActivityId" TEXT,
ADD COLUMN     "complementaryActivityId" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "testId" TEXT,
ADD COLUMN     "type" "ActivityType" NOT NULL DEFAULT 'CLASS',
ALTER COLUMN "dayOfWeek" DROP NOT NULL;

-- DropTable
DROP TABLE "Assessment";

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "topic" TEXT,
    "notes" TEXT,
    "score" INTEGER,
    "worth" INTEGER,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentActivity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "topic" TEXT NOT NULL,
    "notes" TEXT,
    "link" TEXT,
    "score" TEXT,
    "worth" TEXT,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "AssessmentActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplementaryActivity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "notes" TEXT,
    "link" TEXT,

    CONSTRAINT "ComplementaryActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "complementary_ActivityId" TEXT,
    "assessment_ActivityId" TEXT,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Meet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_assessmentActivityId_fkey" FOREIGN KEY ("assessmentActivityId") REFERENCES "AssessmentActivity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_complementaryActivityId_fkey" FOREIGN KEY ("complementaryActivityId") REFERENCES "ComplementaryActivity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentActivity" ADD CONSTRAINT "AssessmentActivity_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentActivity" ADD CONSTRAINT "AssessmentActivity_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplementaryActivity" ADD CONSTRAINT "ComplementaryActivity_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_assessment_ActivityId_fkey" FOREIGN KEY ("assessment_ActivityId") REFERENCES "AssessmentActivity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_complementary_ActivityId_fkey" FOREIGN KEY ("complementary_ActivityId") REFERENCES "ComplementaryActivity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
