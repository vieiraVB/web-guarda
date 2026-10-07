

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/pages/conteudo-detalhe.css";
import ContentsNavbar from "../components/ContentsNavbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:3000/api";

async function carregarConteudo(conteudoId, token) {
  const response = await fetch(`${API_URL}/conteudos/${conteudoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Não foi possível carregar a etapa.");
  return data.conteudo;
}

function parseSections(body) {
  const sections = [];
  let current = { title: "Entenda", content: [] };

  const finishSection = () => {
    if (current.content.length) sections.push(current);
  };

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    const heading = trimmed.replace(/:$/, "").toLocaleUpperCase("pt-BR");
    if (["ENTENDA", "NA PRÁTICA", "ATENÇÃO", "LEMBRE-SE"].includes(heading)) {
      finishSection();
      current = { title: heading === "NA PRÁTICA" ? "Na prática" : heading[0] + heading.slice(1).toLocaleLowerCase("pt-BR"), content: [] };
      continue;
    }

    if (!trimmed) {
      if (current.content.at(-1)?.type !== "break") current.content.push({ type: "break" });
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    const unordered = trimmed.match(/^[-•]\s+(.+)$/);
    if (ordered || unordered) {
      const type = ordered ? "ol" : "ul";
      if (current.content.at(-1)?.type !== type) current.content.push({ type, items: [] });
      current.content.at(-1).items.push((ordered || unordered)[1]);
    } else {
      current.content.push({ type: "paragraph", text: trimmed });
    }
  }
  finishSection();
  return sections.map((section, id) => ({ ...section, id }));
}

function EtapaDetalhe() {
  const { id, etapaId } = useParams();
  const navigate = useNavigate();
  const [conteudo, setConteudo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [concluindo, setConcluindo] = useState(false);
  const [erro, setErro] = useState("");

  const etapa = useMemo(
    () => conteudo?.etapas.find((item) => item.id === etapaId),
    [conteudo, etapaId],
  );
  const etapaIndex = conteudo?.etapas.findIndex((item) => item.id === etapaId) ?? -1;
  const bloqueada = Boolean(conteudo && etapa && !etapa.concluida && etapaIndex > 0 && !conteudo.etapas[etapaIndex - 1].concluida);
  const proximaEtapa = conteudo?.etapas[etapaIndex + 1] ?? null;

  useEffect(() => {
    let active = true;
    async function carregar() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const result = await carregarConteudo(id, token);
        if (active) setConteudo(result);
      } catch (loadError) {
        if (active) setErro(loadError.message);
      } finally {
        if (active) setCarregando(false);
      }
    }
    carregar();
    return () => { active = false; };
  }, [id, navigate]);

  async function concluirEtapa() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setConcluindo(true);
    setErro("");
    try {
      const response = await fetch(`${API_URL}/conteudos/${id}/etapas/${etapaId}/concluir`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível concluir a etapa.");
      setConteudo(await carregarConteudo(id, token));
    } catch (submitError) {
      setErro(submitError.message);
    } finally {
      setConcluindo(false);
    }
  }

  const backUrl = `/conteudos/${id}`;

  return (
    <div className="conteudo-detalhe-page">
      <ContentsNavbar />
      <main>
        <section className="lesson-page">
      <div className="container lesson-container">
            <button className="conteudo-detalhe-back" type="button" onClick={() => navigate(backUrl)}>
              ← Voltar para {conteudo?.titulo || "o módulo"}
            </button>

            {carregando && <div className="lesson-state-card">Carregando conteúdo da etapa...</div>}
            {!carregando && erro && !conteudo && (
              <section className="lesson-state-card" role="alert">
                <h1>Não foi possível abrir esta etapa</h1>
                <p>{erro}</p>
                <button type="button" className="etapa-action" onClick={() => navigate(backUrl)}>Voltar ao módulo</button>
              </section>
            )}
            {!carregando && conteudo && !etapa && (
              <section className="lesson-state-card" role="alert">
                <p>Etapa não encontrada neste módulo.</p>
                <button type="button" className="etapa-action" onClick={() => navigate(backUrl)}>Voltar ao módulo</button>
              </section>
            )}
            {!carregando && conteudo && etapa && bloqueada && (
              <section className="lesson-state-card lesson-blocked-card" role="alert">
                <div className="lesson-blocked-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
                  </svg>
                </div>
                <span className="lesson-blocked-module">{conteudo.titulo} · etapa {etapa.ordem} de {conteudo.totalEtapas}</span>
                <h1>Etapa bloqueada</h1>
                <p>Para acessar este conteúdo, primeiro conclua a etapa anterior.</p>
                <p>Continue seguindo a sequência do módulo para aproveitar melhor o aprendizado.</p>
                <button type="button" className="etapa-action" onClick={() => navigate(backUrl)}>Voltar para o módulo</button>
              </section>
            )}
            {!carregando && conteudo && etapa && !bloqueada && (
              <article className="lesson-card">
                <header className="lesson-header">
                  <span className="conteudo-detalhe-label">MÓDULO {String(conteudo.ordem).padStart(2, "0")} · ETAPA {etapa.ordem} DE {conteudo.totalEtapas}</span>
                  <h1>{etapa.titulo}</h1>
                  <p>{conteudo.titulo} · {conteudo.tema}</p>
                  <div className="lesson-progress" aria-label={`Etapa ${etapa.ordem} de ${conteudo.totalEtapas}`}>
                    <span style={{ width: `${(etapa.ordem / conteudo.totalEtapas) * 100}%` }} />
                  </div>
                </header>

                <div className="lesson-sections">
                  {parseSections(etapa.corpo).map((section) => (
                    <section className={`lesson-section lesson-section-${({ "Na prática": "na-pratica", "Atenção": "atencao", "Lembre-se": "lembre-se" })[section.title] || "entenda"}`} key={section.id}>
                      <h2>{section.title}</h2>
                      {section.content.map((block, index) => {
                        if (block.type === "break") return null;
                        if (block.type === "ul" || block.type === "ol") {
                          const List = block.type;
                          return <List key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</List>;
                        }
                        return <p key={index}>{block.text}</p>;
                      })}
                    </section>
                  ))}
                </div>

                {erro && <p className="lesson-error" role="alert">{erro}</p>}
                {etapa.concluida ? (
                  <div className="lesson-completed">
                    <div>
                      <strong>Etapa concluída</strong>
                      <p>Você pode revisar este conteúdo sempre que quiser.</p>
                    </div>
                    <div className="lesson-completed-actions">
                      <button type="button" className="lesson-secondary-action" onClick={() => navigate(backUrl)}>Voltar ao módulo</button>
                      {proximaEtapa ? (
                        <button type="button" className="etapa-action etapa-complete-action" onClick={() => navigate(`/conteudos/${id}/etapas/${proximaEtapa.id}`)}>Próxima etapa</button>
                      ) : (
                        <button type="button" className="etapa-action etapa-complete-action" onClick={() => navigate(backUrl)}>Módulo concluído</button>
                      )}
                    </div>
                  </div>
                ) : (
                  <footer className="lesson-footer">
                    <p>Quando terminar a leitura, conclua esta etapa para liberar a próxima.</p>
                    <button type="button" className="etapa-action etapa-complete-action" onClick={concluirEtapa} disabled={concluindo}>
                      {concluindo ? "Registrando conclusão..." : "Concluir etapa"}
                    </button>
                  </footer>
                )}
              </article>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default EtapaDetalhe;
