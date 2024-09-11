/*
  Warnings:

  - You are about to drop the column `val_frete` on the `Transporte` table. All the data in the column will be lost.
  - You are about to drop the column `val_icms` on the `Transporte` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transporte" DROP COLUMN "val_frete",
DROP COLUMN "val_icms",
ADD COLUMN     "reducao_bc_icms" DECIMAL(65,30);
