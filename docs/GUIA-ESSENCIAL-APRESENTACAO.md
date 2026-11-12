# Web Guarda: guia essencial da apresentação

Preparado em 12/11/2026. Tempo total: **20 minutos**.

## 1. Links que devem ficar abertos

- Aplicação: https://web-guarda-herickleal.onrender.com
- Pipeline completo aprovado: https://github.com/vieiraVB/web-guarda/actions/runs/43160977343
- Todas as execuções: https://github.com/vieiraVB/web-guarda/actions/workflows/ci-cd-fallback.yml
- Código público: https://github.com/vieiraVB/web-guarda
- Imagem publicada: https://hub.docker.com/r/herickleal/web-guarda/tags
- Saúde da API: https://web-guarda-herickleal.onrender.com/api/health
- Slides: [APRESENTACAO-WEB-GUARDA.html](./apresentacao/APRESENTACAO-WEB-GUARDA.html)

**Atenção à plataforma:** o slide 5 do professor reserva Azure Pipelines ao Vitor e GitHub Actions a outro grupo. O slide 6 não permite repetir plataformas. Temos o [YAML do Azure](../azure-pipelines.yml) preparado, mas a execução comprovada aconteceu no GitHub Actions. A equipe precisa combinar a substituição com o professor. Não apresentar GitHub Actions como uma execução do Azure.

## 2. O que está pronto e o que falta

Comprovado nesta preparação: pipeline completo verde no link acima, 5 testes HTTP da API, 9 testes simulados do controle de deploy, lint, build da imagem, publicação no Docker Hub, deploy no Render e verificação de API/página. Cadastro e login responderam 201 e 200 na API pública. O banco Neon recebeu os dados de demonstração.

Ainda falta: **ensaiar o fluxo educacional pela interface, provocar e corrigir um teste com duas execuções reais, gravar o vídeo de reserva e confirmar a substituição da plataforma**. O gatilho de pull request está configurado, mas não foi demonstrado nesta sessão. A falha técnica de inicialização do Render não substitui a falha proposital de teste exigida pelo professor.

## 3. Antes de apresentar

1. Abra o site alguns minutos antes para tirar o serviço gratuito da suspensão.
2. Abra os slides no navegador. Use setas ou Espaço para avançar, F para tela cheia e N para as notas de fala. Esc sai da tela cheia. Os links abrem em outra aba.
3. Cadastre uma conta de apresentação pela própria interface. Os usuários fictícios do seed não têm senha válida.
4. Faça a avaliação inicial para liberar os conteúdos. A resposta 403 antes dessa avaliação é uma regra do sistema.
5. Ensaie a abertura de um módulo e suas quatro etapas. A avaliação final exige pelo menos três módulos concluídos.
6. Guarde uma conta já preparada para mostrar o progresso sem responder tudo ao vivo. Não divulgue a senha nos slides.
7. Grave um vídeo curto mostrando push, pipeline, falha/correção e site. Não capture secrets, conexão do banco ou chaves.
8. Combine quem fala e quem opera o computador. Cada integrante precisa participar.

## 4. Roteiro de 20 minutos

**0–2 min, slides 1–2:** apresentar equipe, objetivo e público do Web Guarda. A proposta contempla alunos e colaboradores do IBC, conforme o README. Não afirmar implantação institucional ou acessibilidade homologada.

**2–7 min, slides 3–5:** explicar Azure Pipelines, a alternativa executada, gatilhos, jobs, runner/agente, YAML, plano gratuito e comparação. Explicar a restrição de acesso encontrada no Azure e a decisão de contingência.

**7–11 min, slides 6–8:** mostrar arquitetura, sequência do pipeline e exemplos dos testes. Dizer: “O GitHub guarda o código e executa os comandos. O Docker Hub guarda a imagem. O Render executa o container. O Neon guarda os dados.”

**11–17 min, slides 9–10:** abrir a execução aprovada, mostrar o teste quebrado e corrigido, a imagem com tag do commit e o site. Ensaie antes, porque filas e deploy podem exceder o tempo da fala. Use os históricos e o vídeo se necessário.

**17–20 min, slides 11–12:** apresentar limites, aprendizados e perguntas. Dizer o que ainda não foi homologado.

Divisão sugerida, ajustável pelo grupo: Vitor apresenta plataforma e YAML; Herick apresenta aplicação e arquitetura; João mostra testes e falha/correção; Gabriel mostra Docker, deploy e fechamento. Essa divisão não representa autoria já comprovada de cada parte.

## 5. Demonstração da falha e da correção

Não é necessário alterar o código da aplicação. Avise os colegas antes do ensaio em `main`.

1. Abra [backend/tests/app.test.js](../backend/tests/app.test.js).
2. Localize o teste **“responde à rota de saúde”** e altere **somente nele**:

```js
// Correto
expect(response.status).toBe(200);

// Falha proposital para a demonstração
expect(response.status).toBe(201);
```

3. Envie esse arquivo com o summary `Demonstra bloqueio do pipeline por teste com falha`. Pode usar o GitHub Desktop ou os comandos abaixo, a partir da raiz do projeto:

```powershell
git status --short
git add -- backend/tests/app.test.js
git commit -m "Demonstra bloqueio do pipeline por teste com falha"
git push origin main
```

4. Mostre o job de testes vermelho. Docker e Deploy devem ficar ignorados. O site anterior continua no ar.
5. Restaure `200` nesse mesmo teste. Envie a correção:

```powershell
git add -- backend/tests/app.test.js
git commit -m "Corrige teste de saude e restabelece o pipeline"
git push origin main
```

6. Aguarde a nova execução verde, incluindo Deploy. Guarde os links vermelho e verde. Termine com o teste correto no repositório.

Se `git` retornar “Acesso negado” no PowerShell deste computador, substitua `git` por `& 'C:\Program Files\Git\cmd\git.exe'` em cada comando. Não use `git add .`: o PDF do professor e outros arquivos pessoais não precisam ir para o repositório.

## 6. Comandos essenciais

### Apresentar a versão online

Não precisa iniciar Docker ou Node no computador. Abra o link público do Render.

Para consultar a saúde no PowerShell:

```powershell
Invoke-RestMethod https://web-guarda-herickleal.onrender.com/api/health
```

Resposta esperada: `status: ok`. Essa rota confirma a API, sem testar o banco. Cadastro, login e avaliação inicial verificam o fluxo com dados.

### Rodar os testes e o lint localmente

Pré-requisito: Node.js 22 e npm. Execute na raiz do repositório:

```powershell
npm --prefix backend ci
npm --prefix backend test
node --test scripts/deploy-render.test.cjs
npm --prefix frontend ci
npm --prefix frontend run lint
npm --prefix frontend run build
```

Os 9 testes do script usam respostas simuladas. A evidência de acesso real ao Render é o job remoto de deploy. Não anunciar 14 testes de interface ou cobertura completa do produto.

### Rodar tudo localmente com Docker

Pré-requisito: Docker Desktop aberto e o motor Linux funcionando. Este computador apresentou falha no motor durante a preparação. O caminho local abaixo depende de resolver essa condição e não foi revalidado com Docker Desktop nesta sessão.

```powershell
docker info
docker compose up -d --build
docker compose ps
docker compose logs --tail 60 web
```

Abra http://localhost:3000. O Compose sobe o banco e carrega os dados de demonstração. Se a porta 3000 já estiver ocupada pela API local, encerre apenas esse servidor antes de subir o Compose.

Para parar os containers preservando o banco:

```powershell
docker compose down
```

Não use `down -v` na apresentação: essa opção apaga o volume do banco. O script `npm run setup` equivale à subida com Docker Compose. Não é preciso rodar dois comandos de subida.

### Disparar novamente o pipeline

GitHub → Actions → **Plano B - CI e CD completo** → **Run workflow**, branch `main`.

Um novo push em `main` também dispara o fluxo. Pull requests validam testes, qualidade e build, sem publicar nem implantar o serviço principal.

## 7. Configuração já usada na nuvem

No GitHub, secrets: `DOCKERHUB_TOKEN` e `RENDER_API_KEY`. Variables: `DOCKERHUB_USERNAME=herickleal`, `FALLBACK_PUBLISH_ENABLED=true`, `FALLBACK_DEPLOY_ENABLED=true`, `RENDER_SERVICE_ID=srv-dbqkh62fngtc73fsoic0` e `PUBLIC_APP_URL=https://web-guarda-herickleal.onrender.com`.

No Render: plano Free, região Virginia, `PORT=3000`, `NODE_ENV=production`, `DATABASE_URL` secreta do Neon, `JWT_SECRET` secreto e `SEED_DEMO=true` para este banco de demonstração. Health check: `/api/health`. Docker Command: `node scripts/start-container.cjs`.

O script aplica as migrações, executa o seed quando habilitado e inicia a API. Após a demonstração, revise a necessidade de manter o seed a cada reinício. Não aponte esse ambiente de demonstração para dados reais.

O deploy usa a tag exata do commit, aguarda o estado `live` e verifica API e HTML. Atualizar `latest` no Docker Hub, sozinho, não é a evidência do deploy automático.

## 8. Respostas rápidas para perguntas

**O que é CI?** Verificar cada mudança automaticamente antes de publicar, com testes, lint e build.

**O que é CD aqui?** Publicar a imagem aprovada e atualizar o Render automaticamente quando o fluxo de `main` passa.

**O que acontece se um teste falhar?** O job reprova e as etapas dependentes de Docker e deploy não seguem. A versão anterior publicada continua disponível.

**Por que Docker?** A imagem reúne o frontend compilado, a API e suas dependências. O registro permite identificar a versão pelo commit.

**É tudo gratuito?** A demonstração usa os planos gratuitos selecionados. Eles têm cotas e condições, e o Render pode suspender o serviço ocioso. Recursos maiores e excedentes podem ser cobrados. Não há promessa de gratuidade ilimitada.

**O que falta no produto?** Homologar o fluxo completo pela interface, acessibilidade e uso pelo público previsto. O feedback é uma demonstração do frontend. Não mostrar essas partes como homologadas.

**Usaram IA?** Houve apoio de IA na preparação técnica, documentação e apresentação. A equipe precisa compreender os comandos, revisar os resultados e conseguir explicá-los.

## 9. Fontes

- Material fornecido: “CI/CD na prática”, Prof. Érico Borgonove, principalmente slides 5–14.
- [README do projeto](../README.md), [workflow executado](../.github/workflows/ci-cd-fallback.yml), [pipeline Azure preparado](../azure-pipelines.yml) e [script de inicialização](../backend/scripts/start-container.cjs).
- [Conceitos de workflows do GitHub](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows).
- [Cobrança do GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
- [Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines).
- [Agentes e concessões do Azure](https://learn.microsoft.com/en-us/azure/devops/pipelines/licensing/concurrent-jobs).
- [Render Free](https://render.com/docs/free).

As fontes online foram consultadas em 12/11/2026. Reconfira condições antes de contratar recursos.
