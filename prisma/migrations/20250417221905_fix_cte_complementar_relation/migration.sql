/*
  Warnings:

  - The primary key for the `Transporte` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CteComplementar" DROP CONSTRAINT "CteComplementar_transporteId_fkey";

-- AlterTable
ALTER TABLE "CteComplementar" ALTER COLUMN "transporteId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Transporte" DROP CONSTRAINT "Transporte_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transporte_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transporte_id_seq";

-- AddForeignKey
ALTER TABLE "CteComplementar" ADD CONSTRAINT "CteComplementar_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "Transporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
