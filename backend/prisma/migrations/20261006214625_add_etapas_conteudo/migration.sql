-- CreateTable
CREATE TABLE "EtapaConteudo" (
    "id" BIGSERIAL NOT NULL,
    "conteudoId" BIGINT NOT NULL,
    "titulo" TEXT NOT NULL,
    "corpo" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EtapaConteudo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConclusaoEtapa" (
    "usuarioId" BIGINT NOT NULL,
    "etapaId" BIGINT NOT NULL,
    "concluidaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConclusaoEtapa_pkey" PRIMARY KEY ("usuarioId","etapaId")
);

-- CreateIndex
CREATE INDEX "EtapaConteudo_conteudoId_idx" ON "EtapaConteudo"("conteudoId");

-- CreateIndex
CREATE UNIQUE INDEX "EtapaConteudo_conteudoId_ordem_key" ON "EtapaConteudo"("conteudoId", "ordem");

-- CreateIndex
CREATE INDEX "ConclusaoEtapa_etapaId_idx" ON "ConclusaoEtapa"("etapaId");

-- AddForeignKey
ALTER TABLE "EtapaConteudo" ADD CONSTRAINT "EtapaConteudo_conteudoId_fkey" FOREIGN KEY ("conteudoId") REFERENCES "Conteudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConclusaoEtapa" ADD CONSTRAINT "ConclusaoEtapa_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "EtapaConteudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConclusaoEtapa" ADD CONSTRAINT "ConclusaoEtapa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
