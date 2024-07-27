/*
  Warnings:

  - You are about to drop the column `typeAssessmentId` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the `TypeAssessment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeAssessment` to the `Assessment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_typeAssessmentId_fkey";

-- DropForeignKey
ALTER TABLE "TypeAssessment" DROP CONSTRAINT "TypeAssessment_createdByUserId_fkey";

-- DropIndex
DROP INDEX "Assessment_typeAssessmentId_key";

-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "typeAssessmentId",
ADD COLUMN     "typeAssessment" TEXT NOT NULL;

-- DropTable
DROP TABLE "TypeAssessment";
