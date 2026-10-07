const express = require("express");

const {
  buscarInicial,
  enviarInicial,
  buscarFinal,
  enviarFinal,
  buscarEstado,
  buscarResultado,
} = require("../controllers/avaliacoes.controller");

const autenticar = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/status", autenticar, buscarEstado);
router.get("/inicial/resultado", autenticar, buscarResultado);
router.get("/final/resultado", autenticar, buscarResultado);
router.get("/inicial", autenticar, buscarInicial);
router.post("/inicial", autenticar, enviarInicial);

router.get("/final", autenticar, buscarFinal);
router.post("/final", autenticar, enviarFinal);

module.exports = router;
