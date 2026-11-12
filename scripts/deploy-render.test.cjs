const { test } = require("node:test");
const assert = require("node:assert/strict");
const { deploy, configuration } = require("./deploy-render.cjs");

const env = {
  RENDER_API_KEY: "fake-unit-test-token",
  RENDER_SERVICE_ID: "srv-test123",
  PUBLIC_APP_URL: "https://web-guarda.example.test",
  DOCKERHUB_USERNAME: "demo",
  IMAGE_TAG: "a".repeat(40),
};
function response(body, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body, text: async () => body };
}
function mockedFetch(responses, calls = []) {
  return async (url, options) => {
    calls.push({ url, options });
    assert.ok(responses.length, "unexpected extra request");
    return responses.shift();
  };
}
const options = { sleep: async () => {}, log: () => {} };

test("rejects unset Azure macro before making a request", async () => {
  await assert.rejects(deploy({ ...env, RENDER_API_KEY: "$(RENDER_API_KEY)" }, {
    fetch: () => assert.fail("must not send a request"),
  }), /RENDER_API_KEY/);
});

test("requires a public HTTPS origin without credentials", () => {
  assert.throws(() => configuration({ ...env, PUBLIC_APP_URL: "http://example.test" }), /HTTPS/);
  assert.throws(() => configuration({ ...env, PUBLIC_APP_URL: "https://user:pass@example.test" }), /HTTPS/);
});

test("deploys exact commit, polls that deployment, then checks API and frontend", async () => {
  const calls = [];
  const result = await deploy(env, { ...options, fetch: mockedFetch([
    response({ id: "dep-test123", status: "queued" }, 201),
    response({ id: "dep-test123", status: "update_in_progress" }),
    response({ id: "dep-test123", status: "live" }),
    response({ status: "ok" }),
    response('<html><div id="root"></div></html>'),
  ], calls) });
  assert.equal(JSON.parse(calls[0].options.body).imageUrl, `docker.io/demo/web-guarda:${env.IMAGE_TAG}`);
  assert.equal(calls[1].url, "https://api.render.com/v1/services/srv-test123/deploys/dep-test123");
  assert.equal(calls[3].url, `${env.PUBLIC_APP_URL}/api/health`);
  assert.equal(calls[3].options.headers, undefined, "must not send the Render token to the public app");
  assert.equal(result.deployId, "dep-test123");
});

test("fails a rejected deployment without checking an older public version", async () => {
  const calls = [];
  await assert.rejects(deploy(env, { ...options, fetch: mockedFetch([
    response({ id: "dep-test123", status: "created" }, 201),
    response({ id: "dep-test123", status: "update_failed" }),
  ], calls) }), /update_failed/);
  assert.equal(calls.length, 2);
});

test("times out instead of treating a queued request as success", async () => {
  let clock = 0;
  await assert.rejects(deploy(env, { ...options,
    timeoutMs: 1,
    now: () => clock++,
    fetch: mockedFetch([response({ id: "dep-test123", status: "queued" }, 201)]),
  }), /não ficou disponível/);
});

test("does not expose a remote error body containing a token", async () => {
  await assert.rejects(deploy(env, { ...options,
    fetch: mockedFetch([response({ error: env.RENDER_API_KEY }, 401)]),
  }), (error) => error.message.includes("HTTP 401") && !error.message.includes(env.RENDER_API_KEY));
});

test("does not retry a POST whose response was lost", async () => {
  let calls = 0;
  await assert.rejects(deploy(env, { ...options, fetch: async () => {
    calls++;
    throw new Error(env.RENDER_API_KEY);
  } }), /Confira o painel/);
  assert.equal(calls, 1);
});

test("fails when the deployed API health check is unhealthy", async () => {
  await assert.rejects(deploy(env, { ...options, fetch: mockedFetch([
    response({ id: "dep-test123", status: "live" }, 201),
    response({ status: "error" }),
  ]) }), /status ok/);
});

test("fails when the public URL serves something other than the frontend", async () => {
  await assert.rejects(deploy(env, { ...options, fetch: mockedFetch([
    response({ id: "dep-test123", status: "live" }, 201),
    response({ status: "ok" }),
    response("Proxy error page"),
  ]) }), /frontend React/);
});
