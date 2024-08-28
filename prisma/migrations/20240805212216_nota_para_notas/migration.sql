/*
  Warnings:

  - You are about to drop the column `nota` on the `Transporte` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transporte" DROP COLUMN "nota",
ADD COLUMN     "notas" INTEGER[];
