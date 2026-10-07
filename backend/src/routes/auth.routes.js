const express = require("express");

const {
  cadastrar,
  login,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", cadastrar);
router.post("/login", login);

module.exports = router;