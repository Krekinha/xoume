-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DEV', 'COLAB', 'FINANCE');

-- CreateEnum
CREATE TYPE "SituacaoAtendimento" AS ENUM ('ENCERRADO', 'ANDAMENTO');

-- CreateEnum
CREATE TYPE "TipoCliente" AS ENUM ('PFISICA', 'PJURIDICA');

-- CreateEnum
CREATE TYPE "SituacaoEventoEvolucaoAtendimento" AS ENUM ('CONCLUIDO', 'ANDAMENTO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "roles" "Role"[] DEFAULT ARRAY['COLAB']::"Role"[],
    "senha" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL DEFAULT 'titulo',
    "descricao" TEXT,
    "prazo" TIMESTAMP(3),
    "extra" BOOLEAN,
    "situacao" "SituacaoAtendimento"[],
    "proximaAtuacao" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3),
    "clienteId" TEXT,
    "userCriouId" TEXT,
    "userAtualizouId" TEXT,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "tipoCliente" "TipoCliente",
    "razaoNome" TEXT NOT NULL,
    "nome" TEXT,
    "cnpjCpf" TEXT,
    "estadoCivilPf" TEXT,
    "rgPf" TEXT,
    "dnPf" TIMESTAMP(3),
    "logradouroPj" TEXT,
    "numeroLogradouroPj" TEXT,
    "bairroPj" TEXT,
    "complementoPj" TEXT,
    "cepPj" TEXT,
    "cidadePj" TEXT,
    "ufPj" TEXT,
    "telefonePj" TEXT,
    "nomeResponsavel" TEXT,
    "cpfResponsavel" TEXT,
    "estadoCivilResponsavel" TEXT,
    "rgResponsavel" TEXT,
    "dnResponsavel" TIMESTAMP(3),
    "logradouroResponsavel" TEXT,
    "numeroLogradouroResponsavel" TEXT,
    "bairroResponsavel" TEXT,
    "cepResponsavel" TEXT,
    "cidadeResponsavel" TEXT,
    "ufResponsavel" TEXT,
    "telefoneResponsavel" TEXT,
    "email" TEXT,
    "codigoSimples" TEXT,
    "codigoEcac" TEXT,
    "pasta" TEXT,
    "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3),
    "userCriouId" TEXT,
    "userAtualizouId" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Transporte" (
    "id" SERIAL NOT NULL,
    "motorista" TEXT,
    "val_frete" DECIMAL(65,30),
    "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3),
    "empresaId" INTEGER,

    CONSTRAINT "Transporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "razaoNome" TEXT NOT NULL,
    "cnpjCpf" TEXT,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_responsavelAtendimento" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Atendimento_ordem_key" ON "Atendimento"("ordem");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cnpjCpf_key" ON "Cliente"("cnpjCpf");

-- CreateIndex
CREATE UNIQUE INDEX "EvolucaoAtendimento_atendimentoId_key" ON "EvolucaoAtendimento"("atendimentoId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpjCpf_key" ON "Empresa"("cnpjCpf");

-- CreateIndex
CREATE UNIQUE INDEX "_responsavelAtendimento_AB_unique" ON "_responsavelAtendimento"("A", "B");

-- CreateIndex
CREATE INDEX "_responsavelAtendimento_B_index" ON "_responsavelAtendimento"("B");

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_userCriouId_fkey" FOREIGN KEY ("userCriouId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_userAtualizouId_fkey" FOREIGN KEY ("userAtualizouId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_userCriouId_fkey" FOREIGN KEY ("userCriouId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_userAtualizouId_fkey" FOREIGN KEY ("userAtualizouId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvolucaoAtendimento" ADD CONSTRAINT "EvolucaoAtendimento_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoEvolucaoAtendimento" ADD CONSTRAINT "EventoEvolucaoAtendimento_evolucaoAtendimentoId_fkey" FOREIGN KEY ("evolucaoAtendimentoId") REFERENCES "EvolucaoAtendimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_responsavelAtendimento" ADD CONSTRAINT "_responsavelAtendimento_A_fkey" FOREIGN KEY ("A") REFERENCES "Atendimento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_responsavelAtendimento" ADD CONSTRAINT "_responsavelAtendimento_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
