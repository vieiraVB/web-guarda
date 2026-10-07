const {
  listarConteudos,
  buscarConteudoPorId,
  registrarAcesso,
  concluirEtapa,
} = require("../services/conteudos.service");

async function listar(req, res, next) {
  try {
    const conteudos = await listarConteudos(req.usuario.id);

    return res.status(200).json({
      conteudos,
    });
  } catch (error) {
    next(error);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const conteudo = await buscarConteudoPorId(
      req.usuario.id,
      req.params.id
    );

    return res.status(200).json({
      conteudo,
    });
  } catch (error) {
    next(error);
  }
}

async function registrarAcessoConteudo(req, res, next) {
  try {
    const acesso = await registrarAcesso(
      req.usuario.id,
      req.params.id
    );

    return res.status(201).json({
      message: "Acesso ao conteúdo registrado com sucesso.",
      acesso,
    });
  } catch (error) {
    next(error);
  }
}

async function concluirEtapaConteudo(req, res, next) {
  try {
    const resultado = await concluirEtapa(
      req.usuario.id,
      req.params.id,
      req.params.etapaId
    );

    return res.status(200).json({
      message: "Etapa concluída com sucesso.",
      resultado,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  buscarPorId,
  registrarAcessoConteudo,
  concluirEtapaConteudo,
};