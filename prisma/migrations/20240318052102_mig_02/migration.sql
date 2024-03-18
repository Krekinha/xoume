-- CreateEnum
CREATE TYPE "SituacaoAtendimento" AS ENUM ('ENCERRADO', 'ANDAMENTO');

-- CreateEnum
CREATE TYPE "TipoCliente" AS ENUM ('PFISICA', 'PJURIDICA');

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "prazo" TIMESTAMP(3) NOT NULL,
    "extra" BOOLEAN NOT NULL,
    "situacao" "SituacaoAtendimento"[],
    "proximaAtuacao" TIMESTAMP(3) NOT NULL,
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
    "tipoCliente" "TipoCliente" NOT NULL,
    "razaoNome" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpjCpf" TEXT NOT NULL,
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
    "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3),
    "userCriouId" TEXT,
    "userAtualizouId" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colaborador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "atendimentoId" TEXT,

    CONSTRAINT "Colaborador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_responsavelAtendimento" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Atendimento_ordem_key" ON "Atendimento"("ordem");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cnpjCpf_key" ON "Cliente"("cnpjCpf");

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
ALTER TABLE "_responsavelAtendimento" ADD CONSTRAINT "_responsavelAtendimento_A_fkey" FOREIGN KEY ("A") REFERENCES "Atendimento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_responsavelAtendimento" ADD CONSTRAINT "_responsavelAtendimento_B_fkey" FOREIGN KEY ("B") REFERENCES "Colaborador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
