-- CreateTable
CREATE TABLE "CteComplementar" (
    "id" SERIAL NOT NULL,
    "notas" INTEGER[],
    "cte" INTEGER NOT NULL,
    "peso" DECIMAL(65,30),
    "val_tonelada" DECIMAL(65,30),
    "val_frete" DECIMAL(65,30) NOT NULL,
    "val_cte" DECIMAL(65,30),
    "aliquota_icms" DECIMAL(65,30),
    "val_icms" DECIMAL(65,30),
    "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3),
    "transporteId" INTEGER NOT NULL,

    CONSTRAINT "CteComplementar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CteComplementar_transporteId_key" ON "CteComplementar"("transporteId");

-- AddForeignKey
ALTER TABLE "CteComplementar" ADD CONSTRAINT "CteComplementar_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "Transporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
