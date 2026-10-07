import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/pages/resultado.css";
import EvaluationHeader from "../components/EvaluationHeader";
import Button from "../components/Button";

const API_URL = "http://localhost:3000/api";

function Resultado() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [initialResult, setInitialResult] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function carregarResultado() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        let phase = location.state?.phase;
        const headers = { Authorization: `Bearer ${token}` };
        const statusResponse = await fetch(`${API_URL}/avaliacoes/status`, { headers });
        const statusData = await statusResponse.json();
        if (!statusResponse.ok) throw new Error(statusData.error || "Não foi possível carregar o resultado.");

        if (phase !== "initial" && phase !== "final") {
          phase = statusData.estado.avaliacaoFinal.concluida ? "final" : "initial";
        }
        const response = await fetch(`${API_URL}/avaliacoes/${phase === "final" ? "final" : "inicial"}/resultado`, { headers });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Resultado não encontrado.");

        if (active) {
          setResult({
            phase,
            tentativaId: data.resultado.tentativaId,
            correct: data.resultado.acertos,
            total: data.resultado.total,
            percentage: Math.round(Number(data.resultado.pontuacaoPercentual)),
          });
          setInitialResult(statusData.estado.avaliacaoInicial.resultado);
        }
      } catch (error) {
        if (active) setErro(error.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    carregarResultado();
    return () => { active = false; };
  }, [location.state, navigate]);

  if (loading) {
    return <div className="resultado-page"><EvaluationHeader title="Resultado da avaliação" /><main className="resultado-main"><div className="container resultado-container">Carregando resultado...</div></main></div>;
  }

  if (erro || !result) {
    return (
      <div className="resultado-page">
        <EvaluationHeader title="Resultado da avaliação" />
        <main className="resultado-main"><div className="container resultado-container">
          <section className="resultado-header"><h1>Resultado indisponível</h1><p role="alert">{erro || "Não há resultado registrado para esta conta."}</p></section>
          <div className="resultado-actions"><Button onClick={() => navigate("/avaliacao")}>Ver meu progresso</Button></div>
        </div></main>
      </div>
    );
  }

  const isFinalResult = result.phase === "final";
  const { correct, total, percentage } = result;
  const errors = total - correct;
  const initialPercentage = initialResult ? Math.round(Number(initialResult.pontuacaoPercentual)) : null;
  const difference = isFinalResult && initialPercentage !== null ? percentage - initialPercentage : null;

  function handleNextStep() {
    navigate(isFinalResult ? "/feedback" : "/conteudos");
  }

  return (
    <div className="resultado-page">
      <EvaluationHeader title="Resultado da avaliação" />
      <main className="resultado-main">
        <div className="container resultado-container">
          <section className="resultado-header">
            <span className="resultado-label">RESULTADO DA AVALIAÇÃO {isFinalResult ? "FINAL" : "INICIAL"}</span>
            <h1>{isFinalResult ? "Sua avaliação final foi concluída." : "Sua avaliação inicial foi concluída."}</h1>
            <p>{isFinalResult
              ? "Este é o resultado registrado para sua avaliação final."
              : "Este é o resultado registrado para sua avaliação inicial."}</p>
          </section>

          <section className="resultado-card">
            <div className="resultado-score"><span className="score-value">{percentage}%</span><span className="score-label">de aproveitamento</span></div>
            <div className="resultado-divider" />
            <div className="resultado-stats">
              <div className="resultado-stat"><strong>{correct}</strong><span>respostas corretas</span></div>
              <div className="resultado-stat"><strong>{errors}</strong><span>respostas incorretas</span></div>
              <div className="resultado-stat"><strong>{total}</strong><span>questões respondidas</span></div>
            </div>
          </section>

          {isFinalResult && (
            <section className="resultado-comparison">
              <div><span>Avaliação inicial</span><strong>{initialPercentage === null ? "Não registrada" : `${initialPercentage}%`}</strong></div>
              <div><span>Avaliação final</span><strong>{percentage}%</strong></div>
              <div className="comparison-difference"><span>Diferença</span><strong>{difference === null ? "Não disponível" : `${difference > 0 ? "+" : ""}${difference} pontos percentuais`}</strong></div>
              <p>A diferença apresenta apenas os valores registrados nas avaliações; não deve ser interpretada como prova de eficácia ou causalidade.</p>
            </section>
          )}

          <section className="resultado-message">
            <div className="resultado-message-icon">OK</div>
            <div>
              <h2>{isFinalResult ? "Obrigado por concluir a trilha." : "Agora é hora de aprender."}</h2>
              <p>{isFinalResult
                ? "Compartilhe sua experiência para ajudar a melhorar a plataforma Web Guarda."
                : "Explore os conteúdos do Web Guarda e conheça formas de identificar ameaças e proteger seus dados."}</p>
            </div>
          </section>

          <div className="resultado-actions"><Button onClick={handleNextStep}>{isFinalResult ? "Enviar feedback" : "Conhecer os conteúdos"}</Button></div>
        </div>
      </main>
    </div>
  );
}

export default Resultado;
