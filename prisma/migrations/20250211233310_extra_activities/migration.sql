/*
  Warnings:

  - You are about to drop the column `complementaryActivityId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Appointment` table. All the data in the column will be lost.
  - The `type` column on the `Test` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ComplementaryActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meet` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('TEST', 'SEMINAR', 'ARTICLE', 'EXERCISE', 'OTHER');

-- AlterEnum
ALTER TYPE "ActivityType" ADD VALUE 'EXTRA';

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_complementaryActivityId_fkey";

-- DropForeignKey
ALTER TABLE "ComplementaryActivity" DROP CONSTRAINT "ComplementaryActivity_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Meet" DROP CONSTRAINT "Meet_complementary_ActivityId_fkey";

-- DropForeignKey
ALTER TABLE "Meet" DROP CONSTRAINT "Meet_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Meet" DROP CONSTRAINT "Meet_testId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "complementaryActivityId",
DROP COLUMN "name",
ADD COLUMN     "extraActivityId" TEXT;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "type",
ADD COLUMN     "type" "TestType" NOT NULL DEFAULT 'TEST';

-- DropTable
DROP TABLE "ComplementaryActivity";

-- DropTable
DROP TABLE "Meet";

-- CreateTable
CREATE TABLE "ExtraActivity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "link" TEXT,

    CONSTRAINT "ExtraActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_extraActivityId_fkey" FOREIGN KEY ("extraActivityId") REFERENCES "ExtraActivity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraActivity" ADD CONSTRAINT "ExtraActivity_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
