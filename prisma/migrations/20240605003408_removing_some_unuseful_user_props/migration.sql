/*
  Warnings:

  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `matricula` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_cpf_key";

-- DropIndex
DROP INDEX "User_matricula_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cpf",
DROP COLUMN "matricula";
