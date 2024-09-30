/*
  Warnings:

  - Added the required column `userId` to the `Transporte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transporte" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT 'clyxr80tj0002x1dx547679il';

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
