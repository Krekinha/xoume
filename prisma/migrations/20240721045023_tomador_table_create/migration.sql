-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "motoristaId" INTEGER;

-- AlterTable
ALTER TABLE "Transporte" ADD COLUMN     "aliquota_icms" DECIMAL(65,30),
ADD COLUMN     "cte" INTEGER,
ADD COLUMN     "nota" INTEGER,
ADD COLUMN     "peso" DECIMAL(65,30),
ADD COLUMN     "tomadorId" INTEGER,
ADD COLUMN     "val_cte" DECIMAL(65,30),
ADD COLUMN     "val_icms" DECIMAL(65,30),
ADD COLUMN     "val_tonelada" DECIMAL(65,30);

-- CreateTable
CREATE TABLE "Motorista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,

    CONSTRAINT "Motorista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tomador" (
    "id" SERIAL NOT NULL,
    "razaoNome" TEXT NOT NULL,
    "cnpjCpf" TEXT,

    CONSTRAINT "Tomador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Motorista_cpf_key" ON "Motorista"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Tomador_cnpjCpf_key" ON "Tomador"("cnpjCpf");

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_tomadorId_fkey" FOREIGN KEY ("tomadorId") REFERENCES "Tomador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE SET NULL ON UPDATE CASCADE;
