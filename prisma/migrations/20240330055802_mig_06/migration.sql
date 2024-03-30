/*
  Warnings:

  - You are about to drop the `Colaborador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_responsavelAtendimento" DROP CONSTRAINT "_responsavelAtendimento_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "atendimentoId" TEXT;

-- DropTable
DROP TABLE "Colaborador";

-- AddForeignKey
ALTER TABLE "_responsavelAtendimento" ADD CONSTRAINT "_responsavelAtendimento_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
