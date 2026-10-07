import "../styles/pages/conteudo-detalhe.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ContentsNavbar from "../components/ContentsNavbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:3000/api";

async function buscarConteudo(conteudoId, token) {
  const response = await fetch(`${API_URL}/conteudos/${conteudoId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Não foi possível carregar o conteúdo.",
    );
  }

  return data.conteudo;
}

function ConteudoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [conteudo, setConteudo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");

        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const conteudoCarregado = await buscarConteudo(id, token);

        setConteudo(conteudoCarregado);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [id, navigate]);

  function etapaPodeSerAcessada(etapa, index) {
    if (etapa.concluida) {
      return true;
    }

    if (index === 0) {
      return true;
    }

    return conteudo.etapas[index - 1].concluida;
  }

  if (carregando) {
    return (
      <div className="conteudo-detalhe-page">
        <ContentsNavbar />

        <main>
          <div className="container conteudo-detalhe-state">
            <p>Carregando conteúdo...</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (erro || !conteudo) {
    return (
      <div className="conteudo-detalhe-page">
        <ContentsNavbar />

        <main>
          <div className="container conteudo-detalhe-state conteudo-detalhe-state-error">
            <p>{erro || "Conteúdo não encontrado."}</p>

            <button
              type="button"
              className="etapa-action"
              onClick={() => navigate("/conteudos")}
            >
              Voltar para conteúdos
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="conteudo-detalhe-page">
      <ContentsNavbar />

      <main>
        {/* HERO */}
        <section className="conteudo-detalhe-hero">
          <div className="container conteudo-detalhe-hero-content">
            <button
              type="button"
              className="conteudo-detalhe-back"
              onClick={() => navigate("/conteudos")}
            >
              ← Voltar para conteúdos
            </button>

            <span className="conteudo-detalhe-label">
              MÓDULO {String(conteudo.ordem).padStart(2, "0")}
            </span>

            <h1>{conteudo.titulo}</h1>

            <p className="conteudo-detalhe-hero-description">
              {conteudo.corpo}
            </p>

            <div className="conteudo-detalhe-meta">
              <div className="conteudo-detalhe-meta-item">
                <strong>{conteudo.totalEtapas}</strong>
                <span>etapas</span>
              </div>

              <div className="conteudo-detalhe-meta-item">
                <strong>{conteudo.etapasConcluidas}</strong>
                <span>concluídas</span>
              </div>

              <div className="conteudo-detalhe-meta-item">
                <strong>{conteudo.progresso}%</strong>
                <span>progresso</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRESSO */}
        <section className="conteudo-detalhe-progress-section">
          <div className="container">
            <div className="conteudo-detalhe-progress-header">
              <span>Progresso do módulo</span>

              <strong>{conteudo.progresso}%</strong>
            </div>

            <div className="conteudo-detalhe-progress-bar">
              <span
                style={{
                  width: `${conteudo.progresso}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* ETAPAS */}
        <section className="conteudo-detalhe-content">
          <div className="container">
            <div className="conteudo-detalhe-section-header">
              <h2>Etapas do módulo</h2>

              <p>
                Conclua cada etapa em sequência para avançar pelo módulo.
              </p>
            </div>

            <div className="etapas-lista">
              {conteudo.etapas.map((etapa, index) => {
                const disponivel = etapaPodeSerAcessada(etapa, index);

                return (
                  <article
                    key={etapa.id}
                    className={`etapa-card ${
                      etapa.concluida
                        ? "etapa-concluida"
                        : disponivel
                          ? "etapa-disponivel"
                          : "etapa-bloqueada"
                    }`}
                  >
                    <div className="etapa-numero">
                      {String(etapa.ordem).padStart(2, "0")}
                    </div>

                    <div className="etapa-info">
                      <h3>{etapa.titulo}</h3>

                      <p>{etapa.corpo.split(/\n\s*\n/)[0]}</p>
                    </div>

                    {disponivel ? (
                      <button
                        type="button"
                        className="etapa-action etapa-open-action"
                        onClick={() => navigate(`/conteudos/${id}/etapas/${etapa.id}`)}
                      >
                        {etapa.concluida ? "Revisar conteúdo" : "Ver conteúdo"}
                      </button>
                    ) : (
                      <span className="etapa-status">Bloqueada</span>
                    )}
                  </article>
                );
              })}
            </div>

            {conteudo.concluido && (
              <div className="conteudo-detalhe-completo">
                <strong>Módulo concluído</strong>

                <p>
                  Você concluiu todas as etapas deste módulo. Agora pode
                  continuar estudando outro módulo.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ConteudoDetalhe;
