/*
  Warnings:

  - The primary key for the `Empresa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Motorista` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tomador` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Transporte" DROP CONSTRAINT "Transporte_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "Transporte" DROP CONSTRAINT "Transporte_motoristaId_fkey";

-- DropForeignKey
ALTER TABLE "Transporte" DROP CONSTRAINT "Transporte_tomadorId_fkey";

-- DropForeignKey
ALTER TABLE "_EmpresaToMotorista" DROP CONSTRAINT "_EmpresaToMotorista_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmpresaToMotorista" DROP CONSTRAINT "_EmpresaToMotorista_B_fkey";

-- AlterTable
ALTER TABLE "Empresa" DROP CONSTRAINT "Empresa_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Empresa_id_seq";

-- AlterTable
ALTER TABLE "Motorista" DROP CONSTRAINT "Motorista_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Motorista_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Motorista_id_seq";

-- AlterTable
ALTER TABLE "Tomador" DROP CONSTRAINT "Tomador_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tomador_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tomador_id_seq";

-- AlterTable
ALTER TABLE "Transporte" ALTER COLUMN "empresaId" SET DATA TYPE TEXT,
ALTER COLUMN "tomadorId" SET DATA TYPE TEXT,
ALTER COLUMN "motoristaId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_EmpresaToMotorista" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_tomadorId_fkey" FOREIGN KEY ("tomadorId") REFERENCES "Tomador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmpresaToMotorista" ADD CONSTRAINT "_EmpresaToMotorista_A_fkey" FOREIGN KEY ("A") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmpresaToMotorista" ADD CONSTRAINT "_EmpresaToMotorista_B_fkey" FOREIGN KEY ("B") REFERENCES "Motorista"("id") ON DELETE CASCADE ON UPDATE CASCADE;
