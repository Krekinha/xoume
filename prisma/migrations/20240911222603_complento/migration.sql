/*
  Warnings:

  - You are about to drop the column `val_frete` on the `CteComplementar` table. All the data in the column will be lost.
  - You are about to drop the column `val_icms` on the `CteComplementar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CteComplementar" DROP COLUMN "val_frete",
DROP COLUMN "val_icms",
ADD COLUMN     "emissao_cte" TIMESTAMP(3),
ADD COLUMN     "reducao_bc_icms" DECIMAL(65,30);
