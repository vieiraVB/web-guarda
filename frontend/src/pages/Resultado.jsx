import { useLocation, useNavigate } from 'react-router-dom'

import '../styles/pages/resultado.css'

import EvaluationHeader from '../components/EvaluationHeader'
import Button from '../components/Button'

function Resultado() {
  const location = useLocation()
  const navigate = useNavigate()

  const result = location.state || {
    correct: 0,
    total: 5,
    percentage: 0,
  }

  const { correct, total, percentage } = result

  function handleContents() {
    navigate('/conteudos')
  }

  return (
    <div className="resultado-page">
      <EvaluationHeader title="Resultado da avaliação" />

      <main className="resultado-main">
        <div className="container resultado-container">
          <section className="resultado-header">
            <span className="resultado-label">
              AVALIAÇÃO CONCLUÍDA
            </span>

            <h1>
              Veja como você se saiu.
            </h1>

            <p>
              Este resultado representa seu conhecimento
              inicial sobre segurança digital. Continue
              aprendendo para fortalecer sua proteção.
            </p>
          </section>

          <section className="resultado-card">
            <div className="resultado-score">
              <span className="score-value">
                {percentage}%
              </span>

              <span className="score-label">
                de aproveitamento
              </span>
            </div>

            <div className="resultado-divider" />

            <div className="resultado-stats">
              <div className="resultado-stat">
                <strong>{correct}</strong>

                <span>
                  respostas corretas
                </span>
              </div>

              <div className="resultado-stat">
                <strong>{total - correct}</strong>

                <span>
                  respostas incorretas
                </span>
              </div>

              <div className="resultado-stat">
                <strong>{total}</strong>

                <span>
                  questões respondidas
                </span>
              </div>
            </div>
          </section>

          <section className="resultado-message">
            <div className="resultado-message-icon">
              ✓
            </div>

            <div>
              <h2>
                Agora é hora de aprender.
              </h2>

              <p>
                Explore os conteúdos do Web Guarda e
                conheça formas de identificar ameaças,
                proteger seus dados e navegar com mais
                segurança.
              </p>
            </div>
          </section>

          <div className="resultado-actions">
            <Button onClick={handleContents}>
              Conhecer os conteúdos
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Resultado