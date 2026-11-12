const request = require("supertest");
const app = require("../src/app");

describe("API Web Guarda", () => {
  test("informa que a API está online", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: "Web Guarda API",
      status: "online",
    });
  });

  test("responde à rota de saúde", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(201); // falha proposital;
    expect(response.body.status).toBe("ok");
  });

  test("recusa cadastro sem os campos obrigatórios", async () => {
    const response = await request(app).post("/api/auth/register").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Nome, e-mail e senha são obrigatórios.");
  });

  test("recusa login sem e-mail e senha", async () => {
    const response = await request(app).post("/api/auth/login").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("E-mail e senha são obrigatórios.");
  });

  test("retorna 404 para uma rota inexistente", async () => {
    const response = await request(app).get("/api/rota-inexistente");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Rota não encontrada.");
  });
});