/*
  Warnings:

  - The primary key for the `CteComplementar` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CteComplementar" DROP CONSTRAINT "CteComplementar_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CteComplementar_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CteComplementar_id_seq";
