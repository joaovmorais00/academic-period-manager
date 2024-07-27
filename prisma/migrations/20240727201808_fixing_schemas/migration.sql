/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[activityId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activityId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_subjectId_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "activityId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Class";

-- CreateIndex
CREATE UNIQUE INDEX "Subject_activityId_key" ON "Subject"("activityId");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
