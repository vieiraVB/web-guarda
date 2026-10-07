import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/avaliacao-inicial.css";

const API_URL = "http://localhost:3000/api";

function AvaliacaoRedirect() {
  const navigate = useNavigate();
  const [erro, setErro] = useState("");

  useEffect(() => {
    let active = true;
    async function decidirDestino() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      try {
        const response = await fetch(`${API_URL}/avaliacoes/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            navigate("/login", { replace: true });
            return;
          }
          throw new Error(data.error || "Não foi possível consultar seu progresso.");
        }

        const { avaliacaoInicial, avaliacaoFinal } = data.estado;
        const destino = !avaliacaoInicial.concluida
          ? "/avaliacao-inicial"
          : avaliacaoFinal.concluida
            ? "/resultado"
            : avaliacaoFinal.liberada
              ? "/avaliacao-final"
              : "/conteudos";
        if (active) navigate(destino, { replace: true });
      } catch (error) {
        if (active) setErro(error.message);
      }
    }
    decidirDestino();
    return () => { active = false; };
  }, [navigate]);

  return (
    <main className="evaluation-state-page">
      <section className="evaluation-state-card">
        <h1>{erro ? "Não foi possível verificar sua avaliação" : "Verificando seu progresso..."}</h1>
        {erro && <p role="alert">{erro}</p>}
        {erro && <button type="button" onClick={() => navigate("/login")}>Entrar novamente</button>}
      </section>
    </main>
  );
}

export default AvaliacaoRedirect;
