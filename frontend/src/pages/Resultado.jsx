import { useLocation, useNavigate } from 'react-router-dom'

import '../styles/pages/resultado.css'

import EvaluationHeader from '../components/EvaluationHeader'
import Button from '../components/Button'

function readStoredResult(key) {
  try {
    const storedResult = localStorage.getItem(key)

    return storedResult ? JSON.parse(storedResult) : null
  } catch {
    return null
  }
}

function Resultado() {
  const location = useLocation()
  const navigate = useNavigate()

  const initialResult = readStoredResult('webGuardaResultadoInicial')
  const finalResult = readStoredResult('webGuardaResultadoFinal')

  const result =
    location.state ||
    finalResult ||
    initialResult || {
      phase: 'initial',
      correct: 0,
      total: 10,
      percentage: 0,
    }

  const isFinalResult = result.phase === 'final'
  const { correct, total, percentage } = result
  const errors = total - correct
  const difference =
    isFinalResult && initialResult
      ? percentage - initialResult.percentage
      : null

  function handleNextStep() {
    navigate(isFinalResult ? '/feedback' : '/conteudos')
  }

  return (
    <div className="resultado-page">
      <EvaluationHeader title="Resultado da avaliação" />

      <main className="resultado-main">
        <div className="container resultado-container">
          <section className="resultado-header">
            <span className="resultado-label">
              AVALIACAO CONCLUIDA
            </span>

            <h1>
              Veja como você se saiu.
            </h1>

            <p>
              {isFinalResult
                ? 'Este é o resultado da avaliação final. A comparação abaixo apenas mostra os valores registrados nas duas etapas.'
                : 'Este é o resultado da avaliação inicial. Use-o como ponto de partida antes de acessar os conteúdos educativos.'}
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
                <strong>{errors}</strong>

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

          {isFinalResult && (
            <section className="resultado-comparison">
              <div>
                <span>Avaliação inicial</span>
                <strong>
                  {initialResult ? `${initialResult.percentage}%` : 'Nao registrada'}
                </strong>
              </div>

              <div>
                <span>Avaliação final</span>
                <strong>{percentage}%</strong>
              </div>

              <div className="comparison-difference">
                <span>Diferenca</span>
                <strong>
                  {difference === null
                    ? 'Não disponível'
                    : `${difference > 0 ? '+' : ''}${difference} pontos percentuais`}
                </strong>
              </div>

              <p>
                A diferenca acima apresenta apenas os valores registrados nas
                avaliações. Ela não deve ser interpretada como prova de
                eficácia ou causalidade.
              </p>
            </section>
          )}

          <section className="resultado-message">
            <div className="resultado-message-icon">
              OK
            </div>

            <div>
              <h2>
                {isFinalResult
                  ? 'Obrigado por concluir a trilha.'
                  : 'Agora é hora de aprender.'}
              </h2>

              <p>
                {isFinalResult
                  ? 'Compartilhe sua experiência para ajudar a melhorar a apresentação e a plataforma Web Guarda.'
                  : 'Explore os conteúdos do Web Guarda e conheça formas de identificar ameaças, proteger seus dados e navegar com mais segurança.'}
              </p>
            </div>
          </section>

          <div className="resultado-actions">
            <Button onClick={handleNextStep}>
              {isFinalResult ? 'Enviar feedback' : 'Conhecer os conteúdos'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Resultado
