const express = require("express");

const {
  listar,
  buscarPorId,
  registrarAcessoConteudo,
  concluirEtapaConteudo,
} = require("../controllers/conteudos.controller");

const autenticar = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", autenticar, listar);

router.get("/:id", autenticar, buscarPorId);

router.post("/:id/acesso", autenticar, registrarAcessoConteudo);

router.post(
  "/:id/etapas/:etapaId/concluir",
  autenticar,
  concluirEtapaConteudo
);

module.exports = router;