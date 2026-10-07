const prisma = require("../lib/prisma");

function formatarConteudo(conteudo) {
  return {
    id: conteudo.id.toString(),
    titulo: conteudo.titulo,
    tema: conteudo.tema,
    corpo: conteudo.corpo,
    ordem: conteudo.ordem,
    publicado: conteudo.publicado,
    criadoEm: conteudo.criadoEm,
  };
}

function formatarEtapa(etapa) {
  return {
    id: etapa.id.toString(),
    conteudoId: etapa.conteudoId.toString(),
    titulo: etapa.titulo,
    corpo: etapa.corpo,
    ordem: etapa.ordem,
    concluida: etapa.conclusoes.length > 0,
    concluidaEm: etapa.conclusoes[0]?.concluidaEm ?? null,
  };
}

async function verificarAvaliacaoInicialConcluida(usuarioId) {
  const tentativa = await prisma.tentativa.findFirst({
    where: {
      usuarioId: BigInt(usuarioId),
      status: "CONCLUIDA",
      questionario: {
        fase: "INICIAL",
      },
    },
  });

  if (!tentativa) {
    const erro = new Error(
      "Você precisa concluir a avaliação inicial antes de acessar os conteúdos."
    );
    erro.statusCode = 403;
    throw erro;
  }
}

async function listarConteudos(usuarioId) {
  await verificarAvaliacaoInicialConcluida(usuarioId);

  const conteudos = await prisma.conteudo.findMany({
    where: {
      publicado: true,
    },
    orderBy: {
      ordem: "asc",
    },
    select: {
      id: true,
      titulo: true,
      tema: true,
      corpo: true,
      ordem: true,
      publicado: true,
      criadoEm: true,

      etapas: {
        orderBy: {
          ordem: "asc",
        },
        select: {
          id: true,
          conteudoId: true,
          titulo: true,
          corpo: true,
          ordem: true,

          conclusoes: {
            where: {
              usuarioId: BigInt(usuarioId),
            },
            select: {
              concluidaEm: true,
            },
          },
        },
      },
    },
  });

  return conteudos.map((conteudo) => ({
    ...formatarConteudo(conteudo),
    etapas: conteudo.etapas.map(formatarEtapa),
  }));
}

async function buscarConteudoPorId(usuarioId, id) {
  await verificarAvaliacaoInicialConcluida(usuarioId);

  const conteudo = await prisma.conteudo.findUnique({
    where: {
      id: BigInt(id),
    },
    select: {
      id: true,
      titulo: true,
      tema: true,
      corpo: true,
      ordem: true,
      publicado: true,
      criadoEm: true,

      etapas: {
        orderBy: {
          ordem: "asc",
        },
        select: {
          id: true,
          conteudoId: true,
          titulo: true,
          corpo: true,
          ordem: true,

          conclusoes: {
            where: {
              usuarioId: BigInt(usuarioId),
            },
            select: {
              concluidaEm: true,
            },
          },
        },
      },
    },
  });

  if (!conteudo || !conteudo.publicado) {
    const erro = new Error("Conteúdo não encontrado.");
    erro.statusCode = 404;
    throw erro;
  }

  const etapas = conteudo.etapas.map(formatarEtapa);

  const etapasConcluidas = etapas.filter(
    (etapa) => etapa.concluida
  ).length;

  const totalEtapas = etapas.length;

  const concluido = totalEtapas > 0 && etapasConcluidas === totalEtapas;

  const progresso =
    totalEtapas === 0
      ? 0
      : Math.round((etapasConcluidas / totalEtapas) * 100);

  return {
    ...formatarConteudo(conteudo),
    etapas,
    progresso,
    etapasConcluidas,
    totalEtapas,
    concluido,
  };
}

async function registrarAcesso(usuarioId, conteudoId) {
  await verificarAvaliacaoInicialConcluida(usuarioId);

  const conteudo = await prisma.conteudo.findUnique({
    where: {
      id: BigInt(conteudoId),
    },
  });

  if (!conteudo || !conteudo.publicado) {
    const erro = new Error("Conteúdo não encontrado.");
    erro.statusCode = 404;
    throw erro;
  }

  const acesso = await prisma.acessoConteudo.upsert({
    where: {
      usuarioId_conteudoId: {
        usuarioId: BigInt(usuarioId),
        conteudoId: BigInt(conteudoId),
      },
    },
    update: {},
    create: {
      usuarioId: BigInt(usuarioId),
      conteudoId: BigInt(conteudoId),
    },
  });

  return {
    usuarioId: acesso.usuarioId.toString(),
    conteudoId: acesso.conteudoId.toString(),
    acessadoEm: acesso.acessadoEm,
    concluidoEm: acesso.concluidoEm,
  };
}

async function concluirEtapa(usuarioId, conteudoId, etapaId) {
  await verificarAvaliacaoInicialConcluida(usuarioId);

  const conteudo = await prisma.conteudo.findUnique({
    where: {
      id: BigInt(conteudoId),
    },
    select: {
      id: true,
      publicado: true,
    },
  });

  if (!conteudo || !conteudo.publicado) {
    const erro = new Error("Conteúdo não encontrado.");
    erro.statusCode = 404;
    throw erro;
  }

  const etapa = await prisma.etapaConteudo.findFirst({
    where: {
      id: BigInt(etapaId),
      conteudoId: BigInt(conteudoId),
    },
  });

  if (!etapa) {
    const erro = new Error("Etapa não encontrada para este conteúdo.");
    erro.statusCode = 404;
    throw erro;
  }

  const etapaAnterior = await prisma.etapaConteudo.findFirst({
    where: {
      conteudoId: BigInt(conteudoId),
      ordem: etapa.ordem - 1,
    },
  });

  if (etapaAnterior) {
    const anteriorConcluida = await prisma.conclusaoEtapa.findUnique({
      where: {
        usuarioId_etapaId: {
          usuarioId: BigInt(usuarioId),
          etapaId: etapaAnterior.id,
        },
      },
    });

    if (!anteriorConcluida) {
      const erro = new Error(
        "Você precisa concluir a etapa anterior antes de continuar."
      );
      erro.statusCode = 400;
      throw erro;
    }
  }

  const conclusao = await prisma.conclusaoEtapa.upsert({
    where: {
      usuarioId_etapaId: {
        usuarioId: BigInt(usuarioId),
        etapaId: etapa.id,
      },
    },
    update: {},
    create: {
      usuarioId: BigInt(usuarioId),
      etapaId: etapa.id,
    },
  });

  const totalEtapas = await prisma.etapaConteudo.count({
    where: {
      conteudoId: BigInt(conteudoId),
    },
  });

  const etapasConcluidas = await prisma.conclusaoEtapa.count({
    where: {
      usuarioId: BigInt(usuarioId),
      etapa: {
        conteudoId: BigInt(conteudoId),
      },
    },
  });

  const moduloConcluido =
    totalEtapas > 0 && etapasConcluidas === totalEtapas;

  if (moduloConcluido) {
    await prisma.acessoConteudo.upsert({
      where: {
        usuarioId_conteudoId: {
          usuarioId: BigInt(usuarioId),
          conteudoId: BigInt(conteudoId),
        },
      },
      update: {
        concluidoEm: new Date(),
      },
      create: {
        usuarioId: BigInt(usuarioId),
        conteudoId: BigInt(conteudoId),
        concluidoEm: new Date(),
      },
    });
  }

  return {
    etapaId: conclusao.etapaId.toString(),
    concluidaEm: conclusao.concluidaEm,
    etapasConcluidas,
    totalEtapas,
    progresso: Math.round((etapasConcluidas / totalEtapas) * 100),
    moduloConcluido,
  };
}

module.exports = {
  listarConteudos,
  buscarConteudoPorId,
  registrarAcesso,
  concluirEtapa,
};