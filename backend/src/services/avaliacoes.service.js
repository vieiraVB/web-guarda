const prisma = require("../lib/prisma");

async function buscarQuestionarioPorFase(fase) {
  const questionario = await prisma.questionario.findFirst({
    where: {
      fase,
      ativo: true,
    },
    orderBy: {
      versao: "desc",
    },
    include: {
      questoes: {
        orderBy: {
          ordem: "asc",
        },
        include: {
          questao: {
            include: {
              alternativas: {
                orderBy: {
                  id: "asc",
                },
                select: {
                  id: true,
                  texto: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!questionario) {
    const error = new Error(
      `Avaliação ${fase.toLowerCase()} não encontrada.`
    );
    error.statusCode = 404;
    throw error;
  }

  return questionario;
}

function formatarQuestionario(questionario) {
  return {
    id: questionario.id.toString(),
    titulo: questionario.titulo,
    fase: questionario.fase,
    versao: questionario.versao,
    questoes: questionario.questoes.map((item) => ({
      id: item.questao.id.toString(),
      enunciado: item.questao.enunciado,
      tema: item.questao.tema,
      ordem: item.ordem,
      alternativas: item.questao.alternativas.map((alternativa) => ({
        id: alternativa.id.toString(),
        texto: alternativa.texto,
      })),
    })),
  };
}

async function verificarModulosConcluidos(usuarioId) {
  const quantidadeModulosConcluidos =
    await prisma.acessoConteudo.count({
      where: {
        usuarioId: BigInt(usuarioId),
        concluidoEm: {
          not: null,
        },
      },
    });

  return quantidadeModulosConcluidos;
}

async function verificarPodeFazerAvaliacaoFinal(usuarioId) {
  const quantidadeModulosConcluidos =
    await verificarModulosConcluidos(usuarioId);

  if (quantidadeModulosConcluidos < 3) {
    const error = new Error(
      `Você precisa concluir pelo menos 3 módulos antes de realizar a avaliação final. Módulos concluídos: ${quantidadeModulosConcluidos}/3.`
    );
    error.statusCode = 403;
    throw error;
  }
}

async function verificarTentativaExistente(usuarioId, fase) {
  const questionario = await prisma.questionario.findFirst({
    where: { fase, ativo: true },
    orderBy: { versao: "desc" },
    select: { id: true },
  });

  if (!questionario) return;

  const tentativa = await prisma.tentativa.findUnique({
    where: {
      usuarioId_questionarioId: {
        usuarioId: BigInt(usuarioId),
        questionarioId: questionario.id,
      },
    },
  });

  if (tentativa) {
    const nome = fase === "FINAL" ? "final" : "inicial";
    const error = new Error(`Você já realizou esta avaliação ${nome}.`);
    error.statusCode = 409;
    throw error;
  }
}

async function buscarAvaliacaoInicial(usuarioId) {
  await verificarTentativaExistente(usuarioId, "INICIAL");

  const questionario = await buscarQuestionarioPorFase("INICIAL");

  return formatarQuestionario(questionario);
}

async function enviarAvaliacaoInicial(usuarioId, respostas) {
  await verificarTentativaExistente(usuarioId, "INICIAL");

  if (!Array.isArray(respostas) || respostas.length === 0) {
    const error = new Error("É necessário enviar as respostas da avaliação.");
    error.statusCode = 400;
    throw error;
  }

  const questionario = await prisma.questionario.findFirst({
    where: {
      fase: "INICIAL",
      ativo: true,
    },
    orderBy: {
      versao: "desc",
    },
    include: {
      questoes: {
        include: {
          questao: {
            include: {
              alternativas: true,
            },
          },
        },
      },
    },
  });

  if (!questionario) {
    const error = new Error("Avaliação inicial não encontrada.");
    error.statusCode = 404;
    throw error;
  }

  if (respostas.length !== questionario.questoes.length) {
    const error = new Error(
      `A avaliação exige ${questionario.questoes.length} respostas.`
    );
    error.statusCode = 400;
    throw error;
  }

  const respostasNormalizadas = respostas.map((resposta) => ({
    questaoId: BigInt(resposta.questaoId),
    alternativaId: BigInt(resposta.alternativaId),
  }));

  const questoesMap = new Map(
    questionario.questoes.map((item) => [
      item.questaoId.toString(),
      item,
    ])
  );

  for (const resposta of respostasNormalizadas) {
    const item = questoesMap.get(resposta.questaoId.toString());

    if (!item) {
      const error = new Error(
        `A questão ${resposta.questaoId.toString()} não pertence à avaliação.`
      );
      error.statusCode = 400;
      throw error;
    }

    const alternativaPertence = item.questao.alternativas.some(
      (alternativa) =>
        alternativa.id.toString() === resposta.alternativaId.toString()
    );

    if (!alternativaPertence) {
      const error = new Error(
        `A alternativa informada não pertence à questão ${resposta.questaoId.toString()}.`
      );
      error.statusCode = 400;
      throw error;
    }
  }

  const usuario = await prisma.usuario.findUnique({
    where: {
      id: BigInt(usuarioId),
    },
  });

  if (!usuario) {
    const error = new Error("Usuário não encontrado.");
    error.statusCode = 404;
    throw error;
  }

  const resultado = await prisma.$transaction(async (tx) => {
    const tentativa = await tx.tentativa.create({
      data: {
        usuarioId: BigInt(usuarioId),
        questionarioId: questionario.id,
        status: "CONCLUIDA",
        iniciadaEm: new Date(),
        concluidaEm: new Date(),
      },
    });

    let acertos = 0;

    for (const resposta of respostasNormalizadas) {
      const item = questoesMap.get(resposta.questaoId.toString());

      const alternativa = item.questao.alternativas.find(
        (alternativaItem) =>
          alternativaItem.id.toString() ===
          resposta.alternativaId.toString()
      );

      if (alternativa.correta) {
        acertos += 1;
      }

      await tx.resposta.create({
        data: {
          tentativaId: tentativa.id,
          questionarioId: questionario.id,
          questaoId: resposta.questaoId,
          alternativaId: resposta.alternativaId,
        },
      });
    }

    const pontuacaoPercentual =
      (acertos / questionario.questoes.length) * 100;

    const tentativaAtualizada = await tx.tentativa.update({
      where: {
        id: tentativa.id,
      },
      data: {
        pontuacaoPercentual,
      },
    });

    return {
      tentativa: tentativaAtualizada,
      acertos,
      total: questionario.questoes.length,
      pontuacaoPercentual,
    };
  });

  return {
    tentativaId: resultado.tentativa.id.toString(),
    acertos: resultado.acertos,
    total: resultado.total,
    pontuacaoPercentual: resultado.pontuacaoPercentual,
  };
}

async function buscarAvaliacaoFinal(usuarioId) {
  await verificarPodeFazerAvaliacaoFinal(usuarioId);
  await verificarTentativaExistente(usuarioId, "FINAL");

  const questionario = await buscarQuestionarioPorFase("FINAL");

  return formatarQuestionario(questionario);
}

async function buscarResultadoTentativa(usuarioId, fase) {
  const questionario = await prisma.questionario.findFirst({
    where: { fase, ativo: true },
    orderBy: { versao: "desc" },
    include: { questoes: { select: { questaoId: true } } },
  });

  if (!questionario) return null;

  const tentativa = await prisma.tentativa.findUnique({
    where: {
      usuarioId_questionarioId: {
        usuarioId: BigInt(usuarioId),
        questionarioId: questionario.id,
      },
    },
    include: {
      respostas: {
        include: { alternativa: { select: { correta: true } } },
      },
    },
  });

  if (!tentativa || tentativa.status !== "CONCLUIDA") return null;

  const total = questionario.questoes.length;
  const acertos = tentativa.respostas.filter(
    (resposta) => resposta.alternativa.correta,
  ).length;
  const pontuacaoPercentual = Number(
    tentativa.pontuacaoPercentual ?? (total ? (acertos / total) * 100 : 0),
  );

  return {
    fase: fase === "FINAL" ? "final" : "initial",
    tentativaId: tentativa.id.toString(),
    acertos,
    total,
    pontuacaoPercentual,
    concluidaEm: tentativa.concluidaEm,
  };
}

async function buscarEstadoAvaliacoes(usuarioId) {
  const [inicial, final, modulosConcluidos] = await Promise.all([
    buscarResultadoTentativa(usuarioId, "INICIAL"),
    buscarResultadoTentativa(usuarioId, "FINAL"),
    verificarModulosConcluidos(usuarioId),
  ]);

  return {
    modulosConcluidos,
    avaliacaoInicial: {
      concluida: Boolean(inicial),
      resultado: inicial,
    },
    avaliacaoFinal: {
      liberada: modulosConcluidos >= 3,
      concluida: Boolean(final),
      resultado: final,
    },
  };
}

async function buscarResultadoInicial(usuarioId) {
  const resultado = await buscarResultadoTentativa(usuarioId, "INICIAL");
  if (!resultado) {
    const error = new Error("Resultado da avaliação inicial não encontrado.");
    error.statusCode = 404;
    throw error;
  }
  return resultado;
}

async function buscarResultadoFinal(usuarioId) {
  const resultado = await buscarResultadoTentativa(usuarioId, "FINAL");
  if (!resultado) {
    const error = new Error("Resultado da avaliação final não encontrado.");
    error.statusCode = 404;
    throw error;
  }
  return resultado;
}

async function enviarAvaliacaoFinal(usuarioId, respostas) {
  await verificarPodeFazerAvaliacaoFinal(usuarioId);
  await verificarTentativaExistente(usuarioId, "FINAL");

  if (!Array.isArray(respostas) || respostas.length === 0) {
    const error = new Error("É necessário enviar as respostas da avaliação.");
    error.statusCode = 400;
    throw error;
  }

  const questionario = await prisma.questionario.findFirst({
    where: {
      fase: "FINAL",
      ativo: true,
    },
    orderBy: {
      versao: "desc",
    },
    include: {
      questoes: {
        include: {
          questao: {
            include: {
              alternativas: true,
            },
          },
        },
      },
    },
  });

  if (!questionario) {
    const error = new Error("Avaliação final não encontrada.");
    error.statusCode = 404;
    throw error;
  }

  if (respostas.length !== questionario.questoes.length) {
    const error = new Error(
      `A avaliação exige ${questionario.questoes.length} respostas.`
    );
    error.statusCode = 400;
    throw error;
  }

  const respostasNormalizadas = respostas.map((resposta) => ({
    questaoId: BigInt(resposta.questaoId),
    alternativaId: BigInt(resposta.alternativaId),
  }));

  const questoesMap = new Map(
    questionario.questoes.map((item) => [
      item.questaoId.toString(),
      item,
    ])
  );

  for (const resposta of respostasNormalizadas) {
    const item = questoesMap.get(resposta.questaoId.toString());

    if (!item) {
      const error = new Error(
        `A questão ${resposta.questaoId.toString()} não pertence à avaliação.`
      );
      error.statusCode = 400;
      throw error;
    }

    const alternativaPertence = item.questao.alternativas.some(
      (alternativa) =>
        alternativa.id.toString() === resposta.alternativaId.toString()
    );

    if (!alternativaPertence) {
      const error = new Error(
        `A alternativa informada não pertence à questão ${resposta.questaoId.toString()}.`
      );
      error.statusCode = 400;
      throw error;
    }
  }

  const usuario = await prisma.usuario.findUnique({
    where: {
      id: BigInt(usuarioId),
    },
  });

  if (!usuario) {
    const error = new Error("Usuário não encontrado.");
    error.statusCode = 404;
    throw error;
  }

  const resultado = await prisma.$transaction(async (tx) => {
    const tentativa = await tx.tentativa.create({
      data: {
        usuarioId: BigInt(usuarioId),
        questionarioId: questionario.id,
        status: "CONCLUIDA",
        iniciadaEm: new Date(),
        concluidaEm: new Date(),
      },
    });

    let acertos = 0;

    for (const resposta of respostasNormalizadas) {
      const item = questoesMap.get(resposta.questaoId.toString());

      const alternativa = item.questao.alternativas.find(
        (alternativaItem) =>
          alternativaItem.id.toString() ===
          resposta.alternativaId.toString()
      );

      if (alternativa.correta) {
        acertos += 1;
      }

      await tx.resposta.create({
        data: {
          tentativaId: tentativa.id,
          questionarioId: questionario.id,
          questaoId: resposta.questaoId,
          alternativaId: resposta.alternativaId,
        },
      });
    }

    const pontuacaoPercentual =
      (acertos / questionario.questoes.length) * 100;

    const tentativaAtualizada = await tx.tentativa.update({
      where: {
        id: tentativa.id,
      },
      data: {
        pontuacaoPercentual,
      },
    });

    return {
      tentativa: tentativaAtualizada,
      acertos,
      total: questionario.questoes.length,
      pontuacaoPercentual,
    };
  });

  return {
    tentativaId: resultado.tentativa.id.toString(),
    acertos: resultado.acertos,
    total: resultado.total,
    pontuacaoPercentual: resultado.pontuacaoPercentual,
  };
}

module.exports = {
  buscarAvaliacaoInicial,
  enviarAvaliacaoInicial,
  buscarAvaliacaoFinal,
  enviarAvaliacaoFinal,
  buscarEstadoAvaliacoes,
  buscarResultadoInicial,
  buscarResultadoFinal,
};
