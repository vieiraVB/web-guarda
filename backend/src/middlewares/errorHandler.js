function errorHandler(err, req, res, next) {
  const statusCode = err.code === "P2002" ? 409 : err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: err.message || "Erro interno do servidor.",
  });
}

module.exports = errorHandler;
