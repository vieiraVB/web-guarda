require("dotenv").config();

const express = require("express");
const cors = require("cors");

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

app.get("/", (req, res) => {
  res.json({
    name: "Web Guarda API",
    status: "online",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/conteudos", conteudosRoutes);
app.use("/api/avaliacoes", avaliacoesRoutes);

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