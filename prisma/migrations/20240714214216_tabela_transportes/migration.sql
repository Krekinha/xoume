-- CreateTable
CREATE TABLE "Transporte" (
    "id" TEXT NOT NULL,
    "motorista" TEXT,
    "val_frete" DECIMAL(65,30),
    "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3),
    "empresaId" TEXT,

    CONSTRAINT "Transporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "razaoNome" TEXT NOT NULL,
    "cnpjCpf" TEXT,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpjCpf_key" ON "Empresa"("cnpjCpf");

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
