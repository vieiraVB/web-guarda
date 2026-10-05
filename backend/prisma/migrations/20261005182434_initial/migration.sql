-- CreateTable
CREATE TABLE "Usuario" (
    "id" BIGSERIAL NOT NULL,
    "codigoParticipante" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conteudo" (
    "id" BIGSERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "corpo" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conteudo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcessoConteudo" (
    "usuarioId" BIGINT NOT NULL,
    "conteudoId" BIGINT NOT NULL,
    "acessadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "concluidoEm" TIMESTAMP(3),

    CONSTRAINT "AcessoConteudo_pkey" PRIMARY KEY ("usuarioId","conteudoId")
);

-- CreateTable
CREATE TABLE "ConclusaoModulo" (
    "id" BIGSERIAL NOT NULL,
    "usuarioId" BIGINT NOT NULL,
    "concluidoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConclusaoModulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionario" (
    "id" BIGSERIAL NOT NULL,
    "grupoComparacao" TEXT NOT NULL,
    "fase" TEXT NOT NULL,
    "versao" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Questionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questao" (
    "id" BIGSERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Questao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionarioQuestao" (
    "questionarioId" BIGINT NOT NULL,
    "questaoId" BIGINT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "peso" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "QuestionarioQuestao_pkey" PRIMARY KEY ("questionarioId","questaoId")
);

-- CreateTable
CREATE TABLE "Alternativa" (
    "id" BIGSERIAL NOT NULL,
    "questaoId" BIGINT NOT NULL,
    "texto" TEXT NOT NULL,
    "correta" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Alternativa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tentativa" (
    "id" BIGSERIAL NOT NULL,
    "usuarioId" BIGINT NOT NULL,
    "questionarioId" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "pontuacaoPercentual" DECIMAL(65,30),

    CONSTRAINT "Tentativa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resposta" (
    "id" BIGSERIAL NOT NULL,
    "tentativaId" BIGINT NOT NULL,
    "questionarioId" BIGINT NOT NULL,
    "questaoId" BIGINT NOT NULL,
    "alternativaId" BIGINT NOT NULL,

    CONSTRAINT "Resposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" BIGSERIAL NOT NULL,
    "comentario" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_codigoParticipante_key" ON "Usuario"("codigoParticipante");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "AcessoConteudo_conteudoId_idx" ON "AcessoConteudo"("conteudoId");

-- CreateIndex
CREATE INDEX "ConclusaoModulo_usuarioId_idx" ON "ConclusaoModulo"("usuarioId");

-- CreateIndex
CREATE INDEX "QuestionarioQuestao_questaoId_idx" ON "QuestionarioQuestao"("questaoId");

-- CreateIndex
CREATE INDEX "Alternativa_questaoId_idx" ON "Alternativa"("questaoId");

-- CreateIndex
CREATE INDEX "Tentativa_usuarioId_idx" ON "Tentativa"("usuarioId");

-- CreateIndex
CREATE INDEX "Tentativa_questionarioId_idx" ON "Tentativa"("questionarioId");

-- CreateIndex
CREATE INDEX "Resposta_tentativaId_idx" ON "Resposta"("tentativaId");

-- CreateIndex
CREATE INDEX "Resposta_questionarioId_idx" ON "Resposta"("questionarioId");

-- CreateIndex
CREATE INDEX "Resposta_questaoId_idx" ON "Resposta"("questaoId");

-- CreateIndex
CREATE INDEX "Resposta_alternativaId_idx" ON "Resposta"("alternativaId");

-- AddForeignKey
ALTER TABLE "AcessoConteudo" ADD CONSTRAINT "AcessoConteudo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcessoConteudo" ADD CONSTRAINT "AcessoConteudo_conteudoId_fkey" FOREIGN KEY ("conteudoId") REFERENCES "Conteudo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConclusaoModulo" ADD CONSTRAINT "ConclusaoModulo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionarioQuestao" ADD CONSTRAINT "QuestionarioQuestao_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "Questionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionarioQuestao" ADD CONSTRAINT "QuestionarioQuestao_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alternativa" ADD CONSTRAINT "Alternativa_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tentativa" ADD CONSTRAINT "Tentativa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tentativa" ADD CONSTRAINT "Tentativa_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "Questionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_tentativaId_fkey" FOREIGN KEY ("tentativaId") REFERENCES "Tentativa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "Questionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_alternativaId_fkey" FOREIGN KEY ("alternativaId") REFERENCES "Alternativa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
