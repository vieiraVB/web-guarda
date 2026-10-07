const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Web Guarda API funcionando",
  });
});

module.exports = router;