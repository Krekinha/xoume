-- CreateEnum
CREATE TYPE "SituacaoEventoEvolucaoAtendimento" AS ENUM ('CONCLUIDO', 'ANDAMENTO');

-- CreateTable
CREATE TABLE "EvolucaoAtendimento" (
    "id" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "atendimentoId" TEXT NOT NULL,

    CONSTRAINT "EvolucaoAtendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoEvolucaoAtendimento" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "situacao" "SituacaoEventoEvolucaoAtendimento" NOT NULL,
    "dataEvento" TIMESTAMP(3) NOT NULL,
    "evolucaoAtendimentoId" TEXT,

    CONSTRAINT "EventoEvolucaoAtendimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EvolucaoAtendimento_atendimentoId_key" ON "EvolucaoAtendimento"("atendimentoId");

-- AddForeignKey
ALTER TABLE "EvolucaoAtendimento" ADD CONSTRAINT "EvolucaoAtendimento_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoEvolucaoAtendimento" ADD CONSTRAINT "EventoEvolucaoAtendimento_evolucaoAtendimentoId_fkey" FOREIGN KEY ("evolucaoAtendimentoId") REFERENCES "EvolucaoAtendimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
