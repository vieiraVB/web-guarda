/*
  Warnings:

  - A unique constraint covering the columns `[questaoId,id]` on the table `Alternativa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[grupoComparacao,versao,fase]` on the table `Questionario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tentativaId,questaoId]` on the table `Resposta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,questionarioId]` on the table `Tentativa` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `versao` on the `Questionario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_alternativaId_fkey";

-- DropForeignKey
ALTER TABLE "Resposta" DROP CONSTRAINT "Resposta_tentativaId_fkey";

-- DropIndex
DROP INDEX "Alternativa_id_questaoId_key";

-- DropIndex
DROP INDEX "Questionario_grupoComparacao_fase_versao_key";

-- DropIndex
DROP INDEX "Resposta_alternativaId_idx";

-- DropIndex
DROP INDEX "Resposta_questaoId_idx";

-- DropIndex
DROP INDEX "Resposta_questionarioId_idx";

-- DropIndex
DROP INDEX "Resposta_tentativaId_idx";

-- AlterTable
ALTER TABLE "Questionario" DROP COLUMN "versao",
ADD COLUMN     "versao" INTEGER NOT NULL,
ALTER COLUMN "ativo" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Alternativa_questaoId_id_key" ON "Alternativa"("questaoId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Questionario_grupoComparacao_versao_fase_key" ON "Questionario"("grupoComparacao", "versao", "fase");

-- CreateIndex
CREATE INDEX "Resposta_tentativaId_questionarioId_idx" ON "Resposta"("tentativaId", "questionarioId");

-- CreateIndex
CREATE INDEX "Resposta_questionarioId_questaoId_idx" ON "Resposta"("questionarioId", "questaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Resposta_tentativaId_questaoId_key" ON "Resposta"("tentativaId", "questaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Tentativa_id_questionarioId_key" ON "Tentativa"("id", "questionarioId");

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_tentativaId_questionarioId_fkey" FOREIGN KEY ("tentativaId", "questionarioId") REFERENCES "Tentativa"("id", "questionarioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_questaoId_alternativaId_fkey" FOREIGN KEY ("questaoId", "alternativaId") REFERENCES "Alternativa"("questaoId", "id") ON DELETE CASCADE ON UPDATE CASCADE;
