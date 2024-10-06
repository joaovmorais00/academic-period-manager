/*
  Warnings:

  - You are about to drop the column `endDate` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `endTimes` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `startTimes` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `endDateTime` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "endDate",
DROP COLUMN "endTimes",
DROP COLUMN "startDate",
DROP COLUMN "startTimes",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL;
