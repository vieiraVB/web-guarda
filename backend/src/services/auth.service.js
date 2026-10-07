const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("node:crypto");

const prisma = require("../lib/prisma");

async function cadastrarUsuario({ nome, email, senha }) {
  if (!nome || !email || !senha) {
    const error = new Error("Nome, e-mail e senha são obrigatórios.");
    error.statusCode = 400;
    throw error;
  }

  if (senha.length < 6) {
    const error = new Error("A senha deve ter pelo menos 6 caracteres.");
    error.statusCode = 400;
    throw error;
  }

  const emailNormalizado = email.trim().toLowerCase();

  const usuarioExistente = await prisma.usuario.findUnique({
    where: {
      email: emailNormalizado,
    },
  });

  if (usuarioExistente) {
    const error = new Error("Já existe um usuário cadastrado com este e-mail.");
    error.statusCode = 409;
    throw error;
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      codigoParticipante: randomUUID(),
      nome: nome.trim(),
      email: emailNormalizado,
      senhaHash,
      perfil: "PARTICIPANTE",
    },
  });

  return {
    id: usuario.id.toString(),
    codigoParticipante: usuario.codigoParticipante,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
    criadoEm: usuario.criadoEm,
  };
}

async function fazerLogin({ email, senha }) {
  if (!email || !senha) {
    const error = new Error("E-mail e senha são obrigatórios.");
    error.statusCode = 400;
    throw error;
  }

  const emailNormalizado = email.trim().toLowerCase();

  const usuario = await prisma.usuario.findUnique({
    where: {
      email: emailNormalizado,
    },
  });

  if (!usuario) {
    const error = new Error("E-mail ou senha inválidos.");
    error.statusCode = 401;
    throw error;
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);

  if (!senhaValida) {
    const error = new Error("E-mail ou senha inválidos.");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: usuario.id.toString(),
      codigoParticipante: usuario.codigoParticipante,
      perfil: usuario.perfil,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    },
  );

  return {
    token,
    usuario: {
      id: usuario.id.toString(),
      codigoParticipante: usuario.codigoParticipante,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      criadoEm: usuario.criadoEm,
    },
  };
}

module.exports = {
  cadastrarUsuario,
  fazerLogin,
};
