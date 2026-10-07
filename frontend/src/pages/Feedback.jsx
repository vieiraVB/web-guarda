import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../styles/pages/feedback.css'

import EvaluationHeader from '../components/EvaluationHeader'
import Button from '../components/Button'
import Footer from '../components/Footer'

const FEEDBACK_LIMIT = 1000

function Feedback() {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const navigate = useNavigate()

  function handleChange(event) {
    setMessage(event.target.value.slice(0, FEEDBACK_LIMIT))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="feedback-page">
      <EvaluationHeader title="Feedback" />

      <main className="feedback-main">
        <div className="container feedback-container">
          {!submitted ? (
            <section className="feedback-card">
              <div className="feedback-header">
                <span className="feedback-label">FEEDBACK ANONIMO</span>

                <h1>Conte como foi sua experiência.</h1>

                <p>
                  Seu feedback ajuda a melhorar a plataforma Web Guarda e a
                  tornar os conteúdos mais claros para outras pessoas.
                </p>
              </div>

              <div className="feedback-alert">
                <strong>Feedback anônimo</strong>

                <p>
                  Não inclua seu nome, e-mail, telefone ou outras informações
                  pessoais na mensagem.
                </p>
              </div>

              <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="feedback-field">
                  <label htmlFor="feedback-message">
                    Mensagem de feedback
                  </label>

                  <textarea
                    id="feedback-message"
                    name="feedback-message"
                    value={message}
                    onChange={handleChange}
                    maxLength={FEEDBACK_LIMIT}
                    rows="8"
                    placeholder="Escreva sua experiência de forma anônima."
                  />

                  <span className="feedback-counter">
                    {message.length}/{FEEDBACK_LIMIT} caracteres
                  </span>
                </div>

                <div className="feedback-actions">
                  <Button type="submit" disabled={message.trim().length === 0}>
                    Enviar feedback
                  </Button>
                </div>
              </form>
            </section>
          ) : (
            <section className="feedback-card feedback-success">
              <span className="feedback-label">FEEDBACK RECEBIDO</span>

              <h1>Obrigado pelo seu feedback.</h1>

              <p>
                A mensagem foi registrada apenas como demonstração no front-end.
              </p>

              <Button onClick={() => navigate('/')}>
                Voltar ao início
              </Button>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Feedback
