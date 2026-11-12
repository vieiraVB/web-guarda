# Plano B: apresentação com GitHub Actions

Alternativa preparada em 12/11/2026 para o caso de o acesso ao Azure DevOps
não ficar disponível a tempo. Combine a troca de plataforma com o professor.
O [pipeline Azure](../azure-pipelines.yml) continua disponível.

## O que está preparado

O [workflow de contingência](../.github/workflows/ci-cd-fallback.yml) executa:

```text
Push em main ou pull request para main
  -> 5 testes HTTP da API + 9 testes simulados do controle de deploy
  -> lint do frontend
  -> Docker build (inclui a compilação do frontend)
  -> publicação opcional da mesma imagem no Docker Hub
  -> deploy opcional no Render, com tag exata do commit
  -> espera pelo deploy e verificação da API e página pública
```

Também pode ser acionado manualmente em **Actions > Plano B - CI e CD completo
> Run workflow**, depois de o arquivo estar publicado na branch padrão.
Publicação e deploy executam apenas em `main`, nunca em pull requests.

Sem credenciais, os testes, lint e build Docker executam e a publicação/deploy
ficam desabilitados. Isso comprova somente CI; a entrega completa exige habilitar
e verificar CD. Não apresente etapas ignoradas como deploy concluído.

O workflow [Deploy GitHub Pages](../.github/workflows/deploy.yml) já existente
foi preservado. Ele publica outra versão, somente frontend, e não comprova
o funcionamento da API, banco ou container. Para a demonstração completa, use
a URL fornecida pelo Render e o workflow **Plano B - CI e CD completo**.

## 1. Publicar a configuração no repositório correto

As alterações estão locais. Antes da primeira execução, a equipe precisa
revisar, fazer commit e push do workflow, dos scripts de deploy/testes, do
Dockerfile e das exclusões Docker. Não envie `.env`, banco local, documentos
acadêmicos ou códigos de recuperação ao GitHub.

O repositório configurado neste checkout é `vieiraVB/web-guarda`. É preciso
permissão de escrita para publicar a configuração e acesso administrativo
adequado para cadastrar secrets/variables. Se você só consegue ler o projeto,
peça ao proprietário que faça a configuração ou disponibilize as permissões.

Este plano B não fez commit, push, criação de fork ou deploy remoto.

## 2. Primeiro executar somente CI

1. Abra o repositório no GitHub e entre em **Actions**.
2. Habilite Actions para o repositório, caso esteja desabilitado.
3. Depois de publicar os arquivos, envie um commit para `main` ou use **Run workflow**.
4. Abra **Plano B - CI e CD completo** e confira os jobs Testes, Qualidade e Docker.
5. Corrija falhas antes de habilitar publicação.

O build Docker não depende do Docker Desktop deste computador: ele roda no
agente Linux hospedado do GitHub. Confira a disponibilidade e os limites do
GitHub Actions para a conta/repositório antes da execução.

## 3. Habilitar publicação da imagem

Crie um repositório público `web-guarda` numa conta Docker Hub Personal e gere
um token com permissão de escrita. No repositório GitHub, abra:

**Settings > Secrets and variables > Actions**

Em **Variables > New repository variable**, adicione:

| Nome | Valor |
| --- | --- |
| `DOCKERHUB_USERNAME` | Seu usuário do Docker Hub, em minúsculas. |
| `FALLBACK_PUBLISH_ENABLED` | `true` |

Em **Secrets > New repository secret**, adicione:

| Nome | Valor |
| --- | --- |
| `DOCKERHUB_TOKEN` | Token Docker Hub com permissão para publicar. |

Execute novamente em `main`. A mesma imagem construída será publicada como
`docker.io/SEU_USUARIO/web-guarda:SHA_DO_COMMIT` e também `:latest`.
Uma variável com valor `true` é diferente de colocar a palavra `true` num secret:
os nomes e as abas precisam corresponder à tabela.

## 4. Criar banco e hospedagem gratuitos

Siga os passos C e D do [guia de CI/CD](./GUIA-CICD-APRESENTACAO.md):

1. Crie um banco exclusivo para demonstração no **Neon Free** e obtenha sua
   conexão PostgreSQL com TLS.
2. No **Render**, crie um **Web Service > Existing Image**, plano **Free**,
   com `docker.io/SEU_USUARIO/web-guarda:latest`. A imagem deve existir primeiro.
3. Configure no Render `DATABASE_URL` (conexão Neon), `JWT_SECRET` (segredo
   aleatório próprio), `NODE_ENV=production` e `PORT=3000`.
4. Configure o health check `/api/health` e, para esse banco de demonstração,
   o Docker Command:

   ```sh
   sh -c 'npx prisma migrate deploy && npx prisma db seed && node src/app.js'
   ```

5. Aguarde o primeiro deploy. Abra a URL pública e crie sua conta pela interface.
   Os usuários de exemplo do seed não possuem senha válida.

Não use `localhost` como banco na nuvem. Não é necessário inserir a conexão do
banco ou o JWT no GitHub Actions: essas credenciais ficam no Render.
Não crie recursos pagos para seguir o roteiro. Confira cotas e cobrança dos
serviços; a existência do plano Free não significa uso ilimitado.

## 5. Habilitar o deploy automático

No Render, gere uma API key e copie o ID `srv-...` do serviço. No mesmo local
de configuração do GitHub Actions, adicione:

| Tipo | Nome | Valor |
| --- | --- | --- |
| Secret | `RENDER_API_KEY` | API key do Render. |
| Variable | `RENDER_SERVICE_ID` | ID `srv-...` do serviço criado. |
| Variable | `PUBLIC_APP_URL` | `https://NOME.onrender.com`, sem caminho ou parâmetros. |
| Variable | `FALLBACK_DEPLOY_ENABLED` | `true` |

Mantenha a publicação habilitada. Em uma nova execução de `main`, o job Deploy
solicita a imagem identificada pelo SHA do commit, aguarda esse deploy específico
ficar `live` e verifica `/api/health` e o frontend. Falha ou timeout reprova o job.
O mesmo [script de deploy](../scripts/deploy-render.cjs) é usado no Azure.

Só considere o plano B funcionando depois de conferir execução real verde,
imagem no registro, deploy concluído e cadastro/login com banco na URL pública.
Os testes simulados locais do script não provam acesso real ao Render.

## 6. Ensaio da falha e correção

1. Tenha uma execução verde completa registrada.
2. Com a equipe avisada, altere no teste da rota de saúde em
   [app.test.js](../backend/tests/app.test.js) a expectativa HTTP de `200` para `201`.
3. Envie um commit de demonstração. Mostre a execução vermelha: Docker e deploy
   não devem prosseguir quando os testes falham.
4. Restaure `200`, envie outro commit e mostre testes, build, publicação e deploy verdes.
5. Abra a URL do Render e mostre o funcionamento. Grave um vídeo de reserva.

Não deixe a falha proposital como estado final do projeto. Para apresentar,
abra o Render antes: o plano Free pode suspender a aplicação por ociosidade.
Se Azure e GitHub forem configurados para o mesmo serviço, habilite CD em apenas
uma plataforma por vez para evitar implantações concorrentes.

## Fontes

- [Sintaxe do GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax).
- [Variables no GitHub Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables).
- [Publicação Docker pelo GitHub Actions](https://docs.docker.com/build/ci/github-actions/).
- [Hospedar imagem no Render](https://render.com/docs/deploying-an-image).
- [Limites do Render Free](https://render.com/docs/free).
