/*
  Warnings:

  - You are about to drop the column `motoristaId` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `motorista` on the `Transporte` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_motoristaId_fkey";

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "motoristaId";

-- AlterTable
ALTER TABLE "Transporte" DROP COLUMN "motorista",
ADD COLUMN     "motoristaId" INTEGER;

-- CreateTable
CREATE TABLE "_EmpresaToMotorista" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmpresaToMotorista_AB_unique" ON "_EmpresaToMotorista"("A", "B");

-- CreateIndex
CREATE INDEX "_EmpresaToMotorista_B_index" ON "_EmpresaToMotorista"("B");

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmpresaToMotorista" ADD CONSTRAINT "_EmpresaToMotorista_A_fkey" FOREIGN KEY ("A") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmpresaToMotorista" ADD CONSTRAINT "_EmpresaToMotorista_B_fkey" FOREIGN KEY ("B") REFERENCES "Motorista"("id") ON DELETE CASCADE ON UPDATE CASCADE;
