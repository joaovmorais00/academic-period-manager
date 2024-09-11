/*
  Warnings:

  - You are about to drop the column `activityId` on the `Subject` table. All the data in the column will be lost.
  - Changed the type of `daysOfWeek` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_activityId_fkey";

-- DropIndex
DROP INDEX "Subject_activityId_key";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "subjectId" TEXT,
DROP COLUMN "daysOfWeek",
ADD COLUMN     "daysOfWeek" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "activityId";

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
