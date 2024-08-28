/*
  Warnings:

  - Made the column `empresaId` on table `Transporte` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transporte" DROP CONSTRAINT "Transporte_empresaId_fkey";

-- AlterTable
ALTER TABLE "Transporte" ALTER COLUMN "empresaId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
