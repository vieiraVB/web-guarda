import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/pages/avaliacao-inicial.css";
import EvaluationHeader from "./EvaluationHeader";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import Button from "./Button";

const API_URL = "http://localhost:3000/api";

function EvaluationFlow({ phase }) {
  const navigate = useNavigate();
  const isFinal = phase === "final";
  const phasePath = isFinal ? "final" : "inicial";
  const title = isFinal ? "Avaliação final" : "Avaliação inicial";

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [screen, setScreen] = useState("loading");
  const [savedResult, setSavedResult] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const statusResponse = await fetch(`${API_URL}/avaliacoes/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const statusData = await statusResponse.json();
        if (!statusResponse.ok) throw new Error(statusData.error || "Não foi possível verificar as avaliações.");

        const evaluationState = statusData.estado;
        const phaseState = isFinal ? evaluationState.avaliacaoFinal : evaluationState.avaliacaoInicial;

        if (phaseState.concluida) {
          if (active) {
            setSavedResult(phaseState.resultado);
            setScreen("completed");
          }
          return;
        }

        if (isFinal && !phaseState.liberada) {
          if (active) setScreen("locked");
          return;
        }

        const response = await fetch(`${API_URL}/avaliacoes/${phasePath}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Não foi possível carregar a avaliação.");

        if (active) {
          setQuestions(data.avaliacao.questoes);
          setScreen("ready");
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message);
          setScreen("error");
        }
      }
    }

    load();
    return () => { active = false; };
  }, [isFinal, navigate, phasePath]);

  async function finish() {
    const question = questions[currentQuestion];
    if (!question || !answers[question.id]) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((current) => current + 1);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/avaliacoes/${phasePath}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          respostas: questions.map((item) => ({
            questaoId: item.id,
            alternativaId: answers[item.id],
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível registrar suas respostas.");

      navigate("/resultado", {
        state: {
          phase,
          tentativaId: data.resultado.tentativaId,
          correct: data.resultado.acertos,
          total: data.resultado.total,
          percentage: Math.round(Number(data.resultado.pontuacaoPercentual)),
        },
      });
    } catch (submitError) {
      setError(submitError.message);
      setScreen("error");
    } finally {
      setSubmitting(false);
    }
  }

  function openResult() {
    navigate("/resultado", { state: { phase } });
  }

  const question = questions[currentQuestion];

  return (
    <div className="avaliacao-inicial-page">
      <EvaluationHeader title={title} />
      <main className="avaliacao-main">
        <div className="container avaliacao-container">
          <section className="avaliacao-header">
            <span className="avaliacao-label">{isFinal ? "AVALIAÇÃO FINAL" : "AVALIAÇÃO INICIAL"}</span>
            <h1>{isFinal ? "Revise o que você aprendeu sobre segurança digital." : "Descubra o quanto você já sabe sobre segurança digital."}</h1>
            <p>{isFinal ? "Responda às perguntas finais para registrar seu resultado." : "Responda às perguntas com atenção. Esta avaliação identifica seus conhecimentos antes dos conteúdos."}</p>
          </section>

          {screen === "loading" && <section className="avaliacao-content"><p>Verificando sua avaliação...</p></section>}

          {screen === "ready" && question && (
            <section className="avaliacao-content">
              <ProgressBar current={currentQuestion + 1} total={questions.length} />
              <QuestionCard
                question={question.enunciado}
                options={question.alternativas.map((alternative, index) => ({
                  id: alternative.id,
                  letter: String.fromCharCode(65 + index),
                  text: alternative.texto,
                }))}
                selectedOption={answers[question.id]}
                onSelect={(alternativeId) => setAnswers((previous) => ({ ...previous, [question.id]: alternativeId }))}
              />
              {error && <p className="evaluation-error" role="alert">{error}</p>}
              <div className="avaliacao-actions">
                <button type="button" className="avaliacao-back" onClick={() => setCurrentQuestion((current) => Math.max(0, current - 1))} disabled={currentQuestion === 0 || submitting}>Voltar</button>
                <Button onClick={finish} disabled={!answers[question.id] || submitting}>
                  {submitting ? "Enviando..." : currentQuestion === questions.length - 1 ? "Finalizar avaliação" : "Próxima questão"}
                </Button>
              </div>
            </section>
          )}

          {screen === "completed" && (
            <section className="evaluation-state-card">
              <h2>Avaliação {isFinal ? "final" : "inicial"} concluída</h2>
              <p>Você já realizou esta avaliação. Uma nova tentativa não está disponível.</p>
              {savedResult && <p className="evaluation-saved-score">Pontuação: {Math.round(savedResult.pontuacaoPercentual)}%</p>}
              <Button onClick={savedResult ? openResult : () => navigate("/conteudos")}>
                {savedResult ? "Ver resultado" : "Ir aos conteúdos"}
              </Button>
            </section>
          )}

          {screen === "locked" && (
            <section className="evaluation-state-card">
              <h2>Avaliação final bloqueada</h2>
              <p>Conclua pelo menos 3 módulos para liberar a avaliação final.</p>
              <Button onClick={() => navigate("/conteudos")}>Voltar para conteúdos</Button>
            </section>
          )}

          {screen === "error" && (
            <section className="evaluation-state-card" role="alert">
              <h2>Não foi possível abrir a avaliação</h2>
              <p>{error}</p>
              <Button onClick={() => navigate("/avaliacao")}>Verificar meu progresso</Button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default EvaluationFlow;
