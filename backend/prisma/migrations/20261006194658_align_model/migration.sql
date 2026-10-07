/*
  Warnings:

  - You are about to drop the `ConclusaoModulo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,questaoId]` on the table `Alternativa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[grupoComparacao,fase,versao]` on the table `Questionario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionarioId,ordem]` on the table `QuestionarioQuestao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId,questionarioId]` on the table `Tentativa` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ConclusaoModulo" DROP CONSTRAINT "ConclusaoModulo_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Tentativa" ADD COLUMN     "concluidaEm" TIMESTAMP(3),
ADD COLUMN     "iniciadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ConclusaoModulo";

-- CreateIndex
CREATE UNIQUE INDEX "Alternativa_id_questaoId_key" ON "Alternativa"("id", "questaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Questionario_grupoComparacao_fase_versao_key" ON "Questionario"("grupoComparacao", "fase", "versao");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionarioQuestao_questionarioId_ordem_key" ON "QuestionarioQuestao"("questionarioId", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "Tentativa_usuarioId_questionarioId_key" ON "Tentativa"("usuarioId", "questionarioId");
