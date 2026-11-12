# Notas de fala do Web Guarda

Tempo total: 20 minutos. No HTML, pressione N para exibir as notas do slide atual.

## Slide 1: Web Guarda

INTRODUÇÃO · 1 min. Apresentar a equipe e o objetivo. Professor: Érico Borgonove. A imagem pertence ao projeto.

## Slide 2: Segurança digital pela educação

INTRODUÇÃO · 1 min. O público é uma proposta do README. Não alegar adoção pelo IBC ou acessibilidade homologada. A avaliação inicial libera conteúdos e três módulos liberam a final. Fontes: README.md e serviços de avaliações e conteúdos.

## Slide 3: Azure Pipelines e a alternativa executada

PLATAFORMA · 2 min. O slide 5 reserva Azure ao Vitor e GitHub Actions a outro grupo. O slide 6 não permite repetir plataforma. Há YAML Azure preparado, mas nenhuma execução Azure comprovada. Confirmar autorização para a substituição. Fontes: https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines e https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows .

## Slide 4: O que dispara e executa o pipeline

PLATAFORMA · 1,5 min. Cada job usa seu runner. Testes e qualidade rodam em paralelo. needs define dependências. PR está configurado, mas não foi demonstrado nesta sessão. Fontes: .github/workflows/ci-cd-fallback.yml e https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows .

## Slide 5: Comparação das plataformas

PLATAFORMA · 1,5 min. GitHub documenta gratuidade dos runners padrão em repositórios públicos. Não generalizar para recursos maiores ou armazenamento ilimitado. Azure exige conferir concessões e assinatura. Fontes consultadas em 12/11/2026: https://docs.github.com/en/billing/concepts/product-billing/github-actions e https://learn.microsoft.com/en-us/azure/devops/pipelines/licensing/concurrent-jobs .

## Slide 6: Aplicação em container, banco separado

PROJETO · 1,5 min. A imagem contém frontend e API, mas o banco é externo. GitHub Pages é outra publicação, somente frontend. Fontes: Dockerfile, workflow e configuração observada dos serviços. Não abrir secrets na projeção.

## Slide 7: A publicação depende das verificações

PROJETO · 1,5 min. CI verifica o código. CD publica e atualiza o ambiente. Publicação e deploy restringem-se à main e às flags habilitadas. Os testes do script são simulados. O deploy real usa a tag do commit, aguarda live e consulta endpoints. Fontes: workflow e scripts/deploy-render.cjs.

## Slide 8: O que os testes verificam

PROJETO · 1 min. Mostrar backend/tests/app.test.js. Há cinco testes HTTP e nove do controle de deploy. Não anunciar 14 testes de ponta a ponta. Fontes: backend/tests/app.test.js e scripts/deploy-render.test.cjs.

## Slide 9: Pipeline completo aprovado

DEMONSTRAÇÃO · 2 min. Abrir run 43160977343 do commit abf1bd0. Mostrar jobs, registro e deploy. Cadastro e login responderam 201 e 200 pela API pública. Isso não substitui a homologação da interface. Fonte: https://github.com/vieiraVB/web-guarda/actions/runs/43160977343 .

## Slide 10: Falha provocada e correção

DEMONSTRAÇÃO · 4 min. A falha proposital ainda não foi executada na preparação destes slides. Seguir o guia essencial. Alterar somente o status do teste de saúde e terminar com 200. Ensaiar antes e ter os históricos abertos. O slide 13 do professor exige falha/correção e vídeo de reserva.

## Slide 11: Segurança, custos e limites

FECHAMENTO · 1,5 min. Aprendizado real: migrações podem passar e o processo encerrar sem abrir a porta. O deploy precisa aguardar live. Feedback ainda é demonstração do frontend. Não afirmar acessibilidade homologada. Fonte: código, logs observados e https://render.com/docs/free .

## Slide 12: Código, execução e aplicação acessíveis

FECHAMENTO · 1,5 min. Abrir perguntas e garantir participação dos quatro. Entregar repositório, URL, execuções e guia. Total: intro 2 min, plataforma 5 min, projeto 4 min, demo 6 min, fechamento 3 min. Confirmar a troca de plataforma com o professor.
