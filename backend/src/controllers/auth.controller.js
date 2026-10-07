const {
  cadastrarUsuario,
  fazerLogin,
} = require("../services/auth.service");

async function cadastrar(req, res, next) {
  try {
    const usuario = await cadastrarUsuario(req.body);

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso.",
      usuario,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const resultado = await fazerLogin(req.body);

    return res.status(200).json({
      message: "Login realizado com sucesso.",
      token: resultado.token,
      usuario: resultado.usuario,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  cadastrar,
  login,
};