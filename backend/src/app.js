require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const path = require("node:path");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const conteudosRoutes = require("./routes/conteudos.routes");
const avaliacoesRoutes = require("./routes/avaliacoes.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/conteudos", conteudosRoutes);
app.use("/api/avaliacoes", avaliacoesRoutes);

const frontendPath = path.join(__dirname, "..", "public");

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get("/{*path}", (req, res, next) => {
    if (req.path === "/api" || req.path.startsWith("/api/")) {
      return next();
    }

    return res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      name: "Web Guarda API",
      status: "online",
    });
  });
}

app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada.",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Web Guarda API rodando na porta ${PORT}`);
  });
}

module.exports = app;