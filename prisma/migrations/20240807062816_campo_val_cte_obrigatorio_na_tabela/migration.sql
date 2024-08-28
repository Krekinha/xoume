/*
  Warnings:

  - Made the column `val_cte` on table `CteComplementar` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CteComplementar" ALTER COLUMN "val_frete" DROP NOT NULL,
ALTER COLUMN "val_cte" SET NOT NULL;
