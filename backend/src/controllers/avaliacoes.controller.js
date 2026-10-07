const {
  buscarAvaliacaoInicial,
  enviarAvaliacaoInicial,
  buscarAvaliacaoFinal,
  enviarAvaliacaoFinal,
  buscarEstadoAvaliacoes,
  buscarResultadoInicial,
  buscarResultadoFinal,
} = require("../services/avaliacoes.service");

async function buscarInicial(req, res, next) {
  try {
    const avaliacao = await buscarAvaliacaoInicial(req.usuario.id);

    return res.status(200).json({
      avaliacao,
    });
  } catch (error) {
    next(error);
  }
}

async function buscarEstado(req, res, next) {
  try {
    const estado = await buscarEstadoAvaliacoes(req.usuario.id);
    return res.status(200).json({ estado });
  } catch (error) {
    next(error);
  }
}

async function buscarResultado(req, res, next) {
  try {
    const resultado = req.path.startsWith("/inicial/")
      ? await buscarResultadoInicial(req.usuario.id)
      : await buscarResultadoFinal(req.usuario.id);
    return res.status(200).json({ resultado });
  } catch (error) {
    next(error);
  }
}

async function enviarInicial(req, res, next) {
  try {
    const resultado = await enviarAvaliacaoInicial(
      req.usuario.id,
      req.body.respostas
    );

    return res.status(201).json({
      message: "Avaliação inicial enviada com sucesso.",
      resultado,
    });
  } catch (error) {
    next(error);
  }
}

async function buscarFinal(req, res, next) {
  try {
    const avaliacao = await buscarAvaliacaoFinal(req.usuario.id);

    return res.status(200).json({
      avaliacao,
    });
  } catch (error) {
    next(error);
  }
}

async function enviarFinal(req, res, next) {
  try {
    const resultado = await enviarAvaliacaoFinal(
      req.usuario.id,
      req.body.respostas
    );

    return res.status(201).json({
      message: "Avaliação final enviada com sucesso.",
      resultado,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buscarInicial,
  enviarInicial,
  buscarFinal,
  enviarFinal,
  buscarEstado,
  buscarResultado,
};
