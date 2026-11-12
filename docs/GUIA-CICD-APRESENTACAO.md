# Web Guarda: CI/CD para a apresentação

Atualizado em 11/11/2026. O YAML e o controle de deploy foram adaptados para
Docker Hub e Render. Contas, credenciais e execução remota ainda precisam ser
configuradas; alterações locais não comprovam uma aplicação publicada.

## 1. O que o professor pediu

O material da aula "CI/CD na prática", fornecido separadamente pelo professor,
especialmente os slides 6, 8, 11 e 13, exige:

- Usar somente planos gratuitos.
- Disparar o pipeline em push na branch principal e em pull requests.
- Executar build, testes automatizados (pelo menos 3) e linter.
- Construir e publicar uma imagem Docker pelo pipeline.
- Executar o container em um endereço acessível por link.
- Demonstrar uma execução com falha e outra corrigida.
- Manter os segredos fora do código e documentar a reprodução.
- Apresentar em 20 minutos, com demonstração ao vivo e vídeo de reserva.

Portanto, um arquivo YAML pronto ou um site estático no GitHub Pages, sozinho,
não comprova o fluxo completo exigido para este projeto.

## 2. Entenda cada parte

| Parte | Função no trabalho |
| --- | --- |
| GitHub | Guarda o código e recebe os commits e pull requests. |
| Azure DevOps | Projeto da equipe onde fica o Azure Pipelines. |
| Azure Pipelines | Coordena os comandos automáticos após cada alteração. |
| Agente | Computador temporário ou próprio que executa esses comandos. |
| Docker | Empacota frontend e API numa imagem reproduzível. |
| Registro de imagens | Guarda a imagem publicada, como o Docker Hub. |
| Hospedagem | Executa essa imagem e fornece a URL pública. |
| PostgreSQL | Persiste usuários, progresso e avaliações. |

Usar Azure Pipelines não obriga a hospedar o site na Azure. O registro e a
hospedagem são serviços diferentes da plataforma de CI/CD. Pela leitura do
enunciado, esse arranjo atende à escolha de Azure Pipelines; se a turma tiver
uma regra adicional sobre hospedagem, confirme com o professor.

## 3. O que já existe e o que falta

| Requisito | Situação observada |
| --- | --- |
| Arquivo do pipeline | [azure-pipelines.yml](../azure-pipelines.yml), com Test, Quality, Build, Publish e Deploy. |
| Testes | 5 testes HTTP em [app.test.js](../backend/tests/app.test.js) e 9 testes simulados do controle de deploy em [deploy-render.test.cjs](../scripts/deploy-render.test.cjs). Precisam aparecer numa execução real do Azure. |
| Qualidade | ESLint configurado; passou localmente na mesma sessão. |
| Imagem | [Dockerfile](../Dockerfile) compila o frontend e serve frontend/API juntos. Build Docker remoto não foi validado. |
| Publicação atual | Envia ao Docker Hub a mesma imagem construída, com tag do commit. Precisa de usuário/token e habilitação. |
| Deploy atual | Solicita a imagem exata ao Render, aguarda o deploy específico ficar `live` e verifica API/frontend. Precisa de um serviço criado e credenciais. |
| Banco na nuvem | Não configurado ou verificado nesta análise. O banco local não é acessível automaticamente pela hospedagem. |
| Evidências Azure | Não consultadas: sem confirmação de organização, histórico de pipeline ou URL publicada. |

O YAML anterior apontava para Azure Container Registry e Container Apps. Ele foi
adaptado para evitar depender do registro pago ACR (SKUs Basic, Standard e
Premium) e de Service Connections Azure ainda inexistentes. Não trate créditos
promocionais ou estudantis como plano permanentemente gratuito.

## 4. Caminho gratuito sugerido

```text
push no GitHub
  -> Azure Pipelines: testes + lint + build Docker
  -> Docker Hub: imagem pública com tag do commit
  -> Render Free: executa a imagem e fornece HTTPS
  -> Neon Free: banco PostgreSQL externo
```

Esse é o destino configurado no YAML atual. Não crie ACR
nem Container Apps para seguir este caminho. Use apenas os planos Free/Personal
e confira os limites e a cobrança no cadastro. Se não houver opção gratuita,
pare essa etapa em vez de escolher automaticamente um plano pago.

### Passo A: executar primeiro a integração contínua no Azure

1. Entre em <https://dev.azure.com/> com sua conta Microsoft.
2. Crie ou abra a organização e um projeto chamado `web-guarda`.
3. Convide os integrantes. O proprietário do GitHub precisa conceder acesso
   ao repositório `vieiraVB/web-guarda` para a integração do Azure Pipelines.
4. Abra **Pipelines > New pipeline > GitHub** e selecione o repositório.
5. Escolha **Existing Azure Pipelines YAML file**, branch `main` e
   `/azure-pipelines.yml`. Não substitua o arquivo por um template vazio.
6. Não habilite publicação ou deploy ainda. Sem `PUBLISH_ENABLED=true` e
   `DEPLOY_ENABLED=true`, as etapas correspondentes são ignoradas e não há
   referências a Service Connections inexistentes para impedir a validação.
   As etapas Test, Quality e Build são a primeira meta.
7. Autorize o acesso solicitado para esse pipeline e execute **Run**.
8. Confira em cada job a saída dos testes, do ESLint e do build Docker.

Não basta salvar alterações localmente: o Azure lê o arquivo que está no GitHub.
A equipe precisa revisar, fazer commit e push antes de ele usar a configuração.
Este guia não fez commit nem push.

**Se aparecer “No hosted parallelism has been purchased or granted”:** é uma
limitação da organização, não uma falha do JavaScript. Confira
**Organization settings > Pipelines > Parallel jobs**. A documentação atual
vincula a concessão gratuita de agentes hospedados a uma assinatura Azure válida;
não presuma liberação automática só por criar a conta. A alternativa é um agente
próprio registrado no Azure Pipelines. Para os comandos Docker atuais, prefira
um agente Linux com Node e Docker funcionando. O Docker Desktop deste computador
apresentou falhas na preparação local e ainda precisa ser resolvido para esse uso.

### Passo B: publicar a imagem no Docker Hub

1. Crie uma conta Docker Personal e um repositório **público** `web-guarda`.
2. Gere um token de acesso com permissão de escrita para publicar a imagem.
3. No Azure DevOps, abra o pipeline, **Edit > Variables > New variable**.
4. Adicione `DOCKERHUB_USERNAME` com seu usuário Docker Hub e `DOCKERHUB_TOKEN`
   com o token. Marque **Keep this value secret** no token. Não habilite edição
   em tempo de execução das credenciais e não as disponibilize a builds de forks.
5. Adicione `PUBLISH_ENABLED` com valor `true`. Deixe `DEPLOY_ENABLED` ausente
   ou `false` enquanto a hospedagem não existir.
6. Execute em `main`. O pipeline publica depois de testes, lint e build aprovados.
   Pull requests apenas validam; não publicam nem implantam a aplicação principal.
7. Confirme `SEU_USUARIO/web-guarda` no Docker Hub com tags do commit e `latest`.

O pipeline usa `docker save`, artefato de pipeline e `docker load` para publicar
a mesma imagem aprovada, sem repetir o build. O disco de um agente hospedado não
passa automaticamente para o próximo job. Ajuste a retenção de execuções no Azure
para não acumular artefatos grandes além do necessário à apresentação.

### Passo C: criar um banco gratuito no Neon

1. Crie uma conta em <https://neon.com/> e selecione o plano **Free**.
2. Crie um projeto exclusivo de demonstração e abra **Connect**.
3. Copie a string PostgreSQL fornecida, com TLS. Ela contém senha: não envie
   no chat, não coloque em screenshots e não faça commit.
4. Para simplificar as migrations desta demonstração, use uma conexão direta
   do Neon. Preserve os parâmetros TLS fornecidos; não desative a verificação.
5. Esse valor será o `DATABASE_URL` da hospedagem, não o endereço `localhost`
   do seu computador.

### Passo D: colocar o container na web no Render

Faça esta etapa depois de existir uma imagem publicada no Docker Hub.

1. Entre em <https://render.com/> e selecione **New > Web Service**.
2. Escolha **Existing Image**, não um Static Site.
3. Informe `docker.io/SEU_USUARIO/web-guarda:latest` e conecte.
4. Escolha o plano **Free**, nome e região próximos aos do banco.
5. Configure estas variáveis em **Environment**:

   | Nome | Valor |
   | --- | --- |
   | `DATABASE_URL` | Conexão secreta copiada do Neon. |
   | `JWT_SECRET` | Segredo aleatório longo exclusivo dessa aplicação. |
   | `NODE_ENV` | `production` |
   | `PORT` | `3000` |
   | `SEED_DEMO` | `true` apenas para carregar os dados neste banco de demonstração. |

6. Em **Advanced**, configure o health check como `/api/health`.
7. Para esse banco novo de demonstração, defina **Docker Command** como:

   ```sh
   node scripts/start-container.cjs
   ```

   O comando padrão da imagem aplica migrations, mas não carrega os
   questionários. O comando acima também executa o seed necessário à demo.
   Use apenas o banco exclusivo de demonstração; não é um plano de migração
   para dados institucionais. O seed é reexecutado nas inicializações.

8. Crie o serviço e acompanhe os logs até ele ficar disponível.
9. Abra a URL `https://NOME.onrender.com` fornecida pelo Render.
10. Cadastre uma conta pela interface e teste o fluxo. Os usuários de exemplo
    do seed têm hashes fictícios, sem senha válida de login.

O frontend e a API usam o mesmo domínio nessa imagem. O Dockerfile configura
`VITE_API_URL=/api` e `VITE_BASE_PATH=/`; não use `localhost` como endereço da API
na aplicação pública. O GitHub Pages atual é uma publicação separada e não deve
ser confundido com a URL do container.

### Passo E: automatizar o deploy a partir do Azure

1. Na conta Render, gere uma API key em **Account settings > API Keys**.
   Ela permite ações na conta: guarde-a somente como secret e revogue-a quando
   não for mais necessária. Não envie o valor pelo chat.
2. No serviço, identifique o ID `srv-...` exibido na URL do painel/API.
   Copie também a URL pública HTTPS do serviço.
3. Em **Edit > Variables** no Azure Pipelines, adicione:

   | Nome | Valor | Secret? |
   | --- | --- | --- |
   | `RENDER_API_KEY` | API key gerada no Render | Sim |
   | `RENDER_SERVICE_ID` | ID `srv-...` do serviço | Não |
   | `PUBLIC_APP_URL` | `https://NOME.onrender.com`, sem caminho ou parâmetros | Não |
   | `DEPLOY_ENABLED` | `true` | Não |

4. Mantenha `PUBLISH_ENABLED=true`, usuário Docker Hub e token configurados.
5. Execute em `main`. [deploy-render.cjs](../scripts/deploy-render.cjs) envia
   à API do Render a imagem `docker.io/SEU_USUARIO/web-guarda:SHA_DO_COMMIT`,
   aguarda o deploy específico ficar `live` e consulta `/api/health` e a página
   inicial. Um deploy falho, cancelado ou que exceda 20 minutos reprova o job.
6. A resposta inicial de criação não é considerada sucesso de implantação.
   Não repita automaticamente uma solicitação cujo resultado ficou incerto;
   confira o painel antes, porque ela pode já ter criado um deploy.
7. Abra a URL e confira cadastro/login e banco. A verificação HTTP automática
   não substitui essa aceitação funcional.

O Render não implanta uma imagem só porque uma tag foi atualizada no Docker Hub.
A etapa Deploy do Azure faz a solicitação. Não é necessário um Deploy Hook neste
fluxo, pois usamos a API para iniciar e acompanhar a implantação.

## 5. Como ensaiar a falha e a correção

Combine o ensaio com a equipe; este guia não altera testes de propósito.

1. Confirme uma execução verde completa e guarde as evidências.
2. Em [app.test.js](../backend/tests/app.test.js), escolha o teste da rota de
   saúde e troque a expectativa de status `200` por `201`.
3. Faça um commit explícito de demonstração e envie para a branch combinada.
   Para demonstrar o gatilho da principal, a equipe deve combinar o merge/push
   em `main`; não faça alterações concorrentes durante o ensaio.
4. Mostre o teste falhando no Azure. A publicação e o deploy não devem continuar.
5. Restaure a expectativa correta `200`, faça outro commit e envie.
6. Mostre a execução verde, a imagem com a tag do commit e o deploy concluído.
7. Abra a URL pública e demonstre cadastro/login ou o fluxo educacional.
8. Grave um vídeo antes da apresentação como plano B.

Não deixe a falha proposital como estado final do repositório.

## 6. Evidências e limites

- Link do repositório GitHub público e do YAML usado pelo pipeline.
- Execução Azure com pelo menos 3 testes reais; atualmente o projeto tem 5.
- Logs de lint, build e publicação da imagem.
- Imagem no Docker Hub com identificação do commit.
- Deploy concluído no Render e URL funcionando em outro dispositivo.
- Execução vermelha do teste provocado e verde da correção.
- Nenhuma senha, token, string de banco ou deploy hook nas capturas.

Abra o site alguns minutos antes da demo: o Render Free suspende serviços após
15 minutos ociosos e a próxima abertura pode demorar. O plano gratuito tem cotas;
acompanhe consumo e configurações de cobrança. O banco Free do próprio Render
expira após 30 dias; este roteiro usa Neon para evitar depender desse banco
temporário. As cotas de cada fornecedor podem mudar.

O health check atual verifica a resposta da API, sem consultar o banco. Testar
cadastro, login e carregamento do questionário é necessário para comprovar a
conexão real. O feedback ainda é uma demonstração do frontend.

## 7. Roteiro de fala de 20 minutos

| Tempo | Conteúdo |
| --- | --- |
| 2 min | Equipe, Web Guarda e objetivo do trabalho. |
| 5 min | Microsoft/Azure Pipelines, gatilhos, jobs, agentes, YAML, limites gratuitos; comparação com GitHub Actions. |
| 4 min | Código, testes, imagem, registro, hospedagem e banco; explique por que são partes diferentes. |
| 6 min | Commit, execução automática, falha provocada, correção, publicação e URL. |
| 3 min | Dificuldades, aprendizados e perguntas. |

Uma explicação possível: “O GitHub guarda o código. O Azure Pipelines testa e
empacota a aplicação. O Docker Hub guarda a imagem aprovada. O Render executa
essa imagem e o Neon guarda os dados.”

## 8. Fontes oficiais consultadas

- [Conectar GitHub ao Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/github?view=azure-devops).
- [Criar um pipeline](https://learn.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline?view=azure-devops).
- [Agentes e concessões gratuitas](https://learn.microsoft.com/en-us/azure/devops/pipelines/licensing/concurrent-jobs).
- [Service Connections](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops).
- [Planos do ACR](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-skus).
- [Docker Hub: limites](https://docs.docker.com/docker-hub/usage/).
- [Render: imagens prontas](https://render.com/docs/deploying-an-image).
- [Render: iniciar deploy pela API](https://api-docs.render.com/reference/create-deploy).
- [Render: consultar deploy pela API](https://api-docs.render.com/reference/retrieve-deploy).
- [Render: plano gratuito](https://render.com/docs/free).
- [Neon: plano gratuito](https://neon.com/blog/neon-free-plan-1-gb-per-project).
