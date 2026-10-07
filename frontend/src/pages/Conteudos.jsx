import '../styles/pages/conteudos.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Footer from '../components/Footer'
import ContentsNavbar from '../components/ContentsNavbar'

import webGuardaIcon from '../assets/web-guarda-icon.png'

const API_URL = 'http://localhost:3000/api'

function Conteudos() {
  const navigate = useNavigate()

  const [conteudos, setConteudos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [avaliacaoFinal, setAvaliacaoFinal] = useState(null)

  useEffect(() => {
    async function carregarConteudos() {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/login')
          return
        }

        const [response, statusResponse] = await Promise.all([
          fetch(`${API_URL}/conteudos`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/avaliacoes/status`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const [data, statusData] = await Promise.all([
          response.json(),
          statusResponse.json(),
        ])

        if (!response.ok) {
          throw new Error(
            data.error || 'Não foi possível carregar os conteúdos.'
          )
        }
        if (!statusResponse.ok) {
          throw new Error(statusData.error || 'Não foi possível verificar a avaliação final.')
        }

        setConteudos(data.conteudos || [])
        setAvaliacaoFinal(statusData.estado.avaliacaoFinal)
      } catch (error) {
        setErro(error.message)
      } finally {
        setCarregando(false)
      }
    }

    carregarConteudos()
  }, [navigate])

  const modulosConcluidos = conteudos.filter((conteudo) =>
    conteudo.etapas?.length > 0 &&
    conteudo.etapas.every((etapa) => etapa.concluida === true)
  ).length
  const totalModulos = conteudos.length || 5
  const avaliacaoLiberada = avaliacaoFinal?.liberada ?? modulosConcluidos >= 3
  const avaliacaoConcluida = Boolean(avaliacaoFinal?.concluida)

  return (
    <div className="conteudos-page">
      <ContentsNavbar />

      <main>
        {/* HERO */}
        <section className="contents-hero">
          <div className="container contents-hero-content">
            <div className="contents-hero-text">
              <span className="contents-label">
                CENTRAL DE APRENDIZADO
              </span>

              <h1>
                Aprenda a navegar
                <br />
                com mais segurança.
              </h1>

              <p>
                Explore os módulos sobre segurança digital e avance
                pelas etapas de cada conteúdo no seu próprio ritmo.
              </p>

              <div className="contents-hero-meta">
                <div>
                  <strong>{conteudos.length}</strong>
                  <span>módulos disponíveis</span>
                </div>

                <div>
                  <strong>{modulosConcluidos}</strong>
                  <span>módulos concluídos</span>
                </div>
              </div>
            </div>

            <div className="contents-overview">
              <div className="overview-header">
                <span>WEB GUARDA</span>
                <span className="overview-status">ONLINE</span>
              </div>

              <div className="overview-icon">
                <img
                  src={webGuardaIcon}
                  alt="Ícone Web Guarda"
                />
              </div>

              <div className="overview-text">
                <strong>Conhecimento protege.</strong>

                <p>
                  Cada módulo possui quatro etapas. Você pode
                  escolher qualquer módulo e avançar pelas etapas
                  em sequência.
                </p>
              </div>

              <div className="overview-progress">
                <div className="progress-label">
                  <span>Progresso geral</span>
                  <span>
                    {modulosConcluidos}/{conteudos.length || 5}
                  </span>
                </div>

                <div className="progress-bar">
                  <span
                    style={{
                      width: `${
                        conteudos.length > 0
                          ? (modulosConcluidos / conteudos.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUÇÃO */}
        <section className="contents-intro">
          <div className="container contents-intro-content">
            <div>
              <span className="section-label">
                POR QUE APRENDER?
              </span>

              <h2>
                Segurança digital começa
                <br />
                com pequenos cuidados.
              </h2>
            </div>

            <div className="intro-description">
              <p>
                A internet faz parte da rotina de muitas pessoas.
                Saber reconhecer riscos e entender como eles
                funcionam é uma das melhores formas de evitar
                problemas.
              </p>

              <p>
                Os conteúdos do Web Guarda foram organizados em
                módulos independentes para que você possa escolher
                por onde começar.
              </p>
            </div>
          </div>
        </section>

        {/* MÓDULOS */}
        <section className="topics-section">
          <div className="container">
            <div className="topics-header">
              <div>
                <span className="section-label">
                  BIBLIOTECA DE CONTEÚDOS
                </span>

                <h2>
                  Escolha um módulo
                </h2>
              </div>

              <p>
                Cada módulo possui quatro etapas. As etapas de um
                mesmo módulo devem ser concluídas em sequência.
              </p>
            </div>

            {carregando && (
              <div className="contents-state">
                <p>Carregando conteúdos...</p>
              </div>
            )}

            {!carregando && erro && (
              <div className="contents-state contents-state-error">
                <p>{erro}</p>
              </div>
            )}

            {!carregando && !erro && conteudos.length === 0 && (
              <div className="contents-state">
                <p>Nenhum conteúdo disponível no momento.</p>
              </div>
            )}

            {!carregando && !erro && conteudos.length > 0 && (
              <div className="topics-list">
                {conteudos.map((conteudo) => {
                  const etapasConcluidas = conteudo.etapas?.filter(
                    (etapa) => etapa.concluida === true,
                  ).length || 0;
                  const totalEtapas = conteudo.etapas?.length || 4;
                  const moduloConcluido = totalEtapas > 0 && etapasConcluidas === totalEtapas;
                  const progressoEtapas = Math.round((etapasConcluidas / totalEtapas) * 100);

                  return (
                    <article
                    className={`content-topic-card ${moduloConcluido ? 'content-topic-card-complete' : ''}`}
                    key={conteudo.id}
                  >
                    <div className="topic-number">
                      {String(conteudo.ordem).padStart(2, '0')}
                    </div>

                    <div className="topic-main">
                      <div className="topic-heading">
                        <div>
                          <span className="topic-tag">
                            {conteudo.tema}
                          </span>

                          <h3>{conteudo.titulo}</h3>
                        </div>

                        <span className="topic-level">
                          {conteudo.etapas?.length || 4} etapas
                        </span>
                      </div>

                      <p>{conteudo.corpo}</p>

                      <div className="topic-progress">
                        <div className="topic-progress-header">
                          <span className="topic-progress-count">
                            {etapasConcluidas} de {totalEtapas} etapas
                          </span>

                          <span className="topic-progress-percent">
                            {progressoEtapas}%
                          </span>
                        </div>

                        <div className="topic-progress-bar">
                          <span
                            style={{
                              width: `${progressoEtapas}%`,
                            }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="topic-link"
                        onClick={() =>
                          navigate(`/conteudos/${conteudo.id}`)
                        }
                      >
                        {moduloConcluido
                          ? 'Revisar conteúdo'
                          : 'Explorar conteúdo'}

                        <span>→</span>
                      </button>
                    </div>
                  </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="learning-section">
          <div className="container">
            <div className="learning-header">
              <span className="section-label">
                COMO FUNCIONA
              </span>

              <h2>
                Aprenda no seu ritmo.
              </h2>

              <p>
                Os módulos são independentes e cada um apresenta
                seu conteúdo em quatro etapas sequenciais.
              </p>
            </div>

            <div className="learning-steps">
              <div className="learning-step">
                <span className="step-number">01</span>

                <div>
                  <h3>Escolha</h3>

                  <p>
                    Escolha qualquer um dos módulos disponíveis
                    para começar.
                  </p>
                </div>
              </div>

              <div className="learning-step">
                <span className="step-number">02</span>

                <div>
                  <h3>Avance</h3>

                  <p>
                    Conclua as quatro etapas do módulo em
                    sequência.
                  </p>
                </div>
              </div>

              <div className="learning-step">
                <span className="step-number">03</span>

                <div>
                  <h3>Conclua</h3>

                  <p>
                    Ao finalizar as quatro etapas, o módulo será
                    marcado como concluído.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="contents-cta">
          <div className="container">
            <div className="contents-cta-box">
              <div>
                <span className="section-label">AVALIAÇÃO FINAL</span>

                <h2>{avaliacaoConcluida ? 'Avaliação final concluída' : 'Avaliação final'}</h2>

                <p>
                  {avaliacaoConcluida
                    ? 'Você já realizou esta avaliação.'
                    : avaliacaoLiberada
                      ? 'Você já concluiu os módulos necessários.'
                      : 'Conclua pelo menos 3 dos 5 módulos para liberar a avaliação final.'}
                </p>
                {avaliacaoConcluida && avaliacaoFinal.resultado && (
                  <p className="contents-final-progress">
                    Pontuação: {Math.round(avaliacaoFinal.resultado.pontuacaoPercentual)}%
                  </p>
                )}
                <p className="contents-final-progress">
                  {modulosConcluidos} de {totalModulos} módulos concluídos
                </p>
              </div>

              <button
                type="button"
                className="contents-final-button"
                disabled={!avaliacaoLiberada || avaliacaoFinal === null && carregando}
                onClick={() => navigate(avaliacaoConcluida ? '/resultado' : '/avaliacao', {
                  state: avaliacaoConcluida ? { phase: 'final' } : undefined,
                })}
              >
                {avaliacaoConcluida
                  ? 'Ver resultado'
                  : avaliacaoLiberada
                    ? 'Fazer avaliação final'
                    : 'Avaliação bloqueada'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Conteudos
