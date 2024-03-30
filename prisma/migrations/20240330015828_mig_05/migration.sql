-- AlterTable
ALTER TABLE "Atendimento" ADD COLUMN     "titulo" TEXT NOT NULL DEFAULT 'titulo',
ALTER COLUMN "descricao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "pasta" TEXT;
