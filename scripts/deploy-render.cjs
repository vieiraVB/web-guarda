// API oficial: https://api-docs.render.com/reference/create-deploy
// Sem dependências npm; o token é lido apenas do ambiente e nunca registrado.
const { setTimeout: sleep } = require("node:timers/promises");

function configuration(env) {
  for (const name of ["RENDER_API_KEY", "RENDER_SERVICE_ID", "PUBLIC_APP_URL", "DOCKERHUB_USERNAME", "IMAGE_TAG"]) {
    if (!env[name] || env[name].startsWith("$(")) {
      throw new Error(`Configure a variável ${name} na plataforma de CI/CD.`);
    }
  }
  if (!/^srv-[a-zA-Z0-9]+$/.test(env.RENDER_SERVICE_ID)) {
    throw new Error("RENDER_SERVICE_ID deve ser o identificador srv-... do serviço.");
  }
  if (!/^[a-z0-9][a-z0-9_-]+$/.test(env.DOCKERHUB_USERNAME) || !/^[a-f0-9]{40}$/.test(env.IMAGE_TAG)) {
    throw new Error("Usuário Docker Hub ou tag do commit inválidos.");
  }
  const url = new URL(env.PUBLIC_APP_URL);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("PUBLIC_APP_URL deve ser a origem HTTPS pública, sem credenciais ou parâmetros.");
  }
  const repository = env.CONTAINER_REPOSITORY || "web-guarda";
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(repository)) throw new Error("Repositório de imagem inválido.");
  return {
    apiKey: env.RENDER_API_KEY,
    serviceId: env.RENDER_SERVICE_ID,
    publicUrl: url.origin,
    imageUrl: `docker.io/${env.DOCKERHUB_USERNAME}/${repository}:${env.IMAGE_TAG}`,
  };
}

async function deploy(env, options = {}) {
  const config = configuration(env);
  const request = options.fetch || globalThis.fetch;
  const pause = options.sleep || sleep;
  const log = options.log || console.log;
  const now = options.now || Date.now;
  const deadline = now() + (options.timeoutMs ?? 20 * 60 * 1000);
  const endpoint = `https://api.render.com/v1/services/${config.serviceId}/deploys`;

  async function api(url, method = "GET", body) {
    let response;
    try {
      response = await request(url, {
        method,
        headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
        ...(body ? { body: JSON.stringify(body) } : {}),
        signal: AbortSignal.timeout(30000),
      });
    } catch {
      throw new Error("Falha de conexão com a API do Render. Confira o painel antes de repetir o deploy.");
    }
    // Não inclui corpo de erro remoto, headers ou credenciais na saída.
    if (!response.ok) throw new Error(`Render respondeu HTTP ${response.status}. Confira permissões e o serviço no painel.`);
    return response.json();
  }

  // Não repete POST automaticamente: um timeout pode ter criado o deploy.
  const created = await api(endpoint, "POST", { imageUrl: config.imageUrl });
  if (!/^dep-[a-zA-Z0-9]+$/.test(created.id || "")) throw new Error("O Render não retornou um identificador de deploy válido.");
  log(`Deploy solicitado: ${created.id}; imagem ${config.imageUrl}`);
  let current = created;
  const failures = new Set(["build_failed", "update_failed", "pre_deploy_failed", "canceled", "deactivated"]);
  while (current.status !== "live") {
    if (failures.has(current.status)) throw new Error(`Deploy encerrado com status ${current.status}. Consulte os logs no Render.`);
    if (now() >= deadline) throw new Error("O deploy não ficou disponível em 20 minutos. Confira o painel do Render.");
    log(`Estado do deploy: ${current.status}`);
    await pause(15000);
    current = await api(`${endpoint}/${created.id}`);
  }

  // Esperar o deploy específico evita validar apenas a versão antiga do site.
  for (const path of ["/api/health", "/"]) {
    let response;
    try {
      response = await request(`${config.publicUrl}${path}`, { signal: AbortSignal.timeout(60000) });
    } catch {
      throw new Error(`A aplicação não respondeu em ${path} após o deploy.`);
    }
    if (!response.ok) throw new Error(`Verificação pública falhou em ${path}: HTTP ${response.status}.`);
    if (path === "/api/health") {
      const health = await response.json();
      if (health.status !== "ok") throw new Error("A API pública não confirmou status ok.");
    } else if (!(await response.text()).includes('<div id="root">')) {
      throw new Error("A página pública não contém o frontend React esperado.");
    }
  }
  log(`Deploy disponível e HTTP validado: ${config.publicUrl}`);
  return { deployId: created.id, imageUrl: config.imageUrl };
}

if (require.main === module) {
  deploy(process.env).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { deploy, configuration };
