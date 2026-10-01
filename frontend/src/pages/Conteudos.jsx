import '../styles/pages/conteudos.css'

import { useNavigate } from 'react-router-dom'

import Footer from '../components/Footer'
import Button from '../components/Button'

import webGuardaIcon from '../assets/web-guarda-icon.png'
import ContentsNavbar from '../components/ContentsNavbar'

function Conteudos() {
  const navigate = useNavigate()

  const topics = [
    {
      number: '01',
      title: 'Phishing',
      tag: 'Ameaças',
      description:
        'Aprenda a identificar mensagens, links e páginas falsas criadas para roubar informações.',
      level: 'Iniciante',
    },
    {
      number: '02',
      title: 'Golpes virtuais',
      tag: 'Ameaças',
      description:
        'Conheça os principais golpes encontrados na internet e saiba quais sinais devem chamar sua atenção.',
      level: 'Iniciante',
    },
    {
      number: '03',
      title: 'Engenharia social',
      tag: 'Comportamento',
      description:
        'Entenda como criminosos utilizam manipulação e confiança para conseguir informações.',
      level: 'Intermediário',
    },
    {
      number: '04',
      title: 'Senhas seguras',
      tag: 'Proteção',
      description:
        'Descubra como criar senhas mais fortes e proteger suas contas contra acessos indevidos.',
      level: 'Iniciante',
    },
    {
      number: '05',
      title: 'Roubo de dados',
      tag: 'Privacidade',
      description:
        'Entenda como seus dados podem ser expostos e quais cuidados ajudam a reduzir esses riscos.',
      level: 'Intermediário',
    },
    {
      number: '06',
      title: 'Páginas falsas',
      tag: 'Ameaças',
      description:
        'Aprenda a observar sinais que ajudam a diferenciar sites legítimos de páginas fraudulentas.',
      level: 'Iniciante',
    },
    {
      number: '07',
      title: 'Malware',
      tag: 'Ameaças',
      description:
        'Conheça programas maliciosos, seus riscos e os principais cuidados para evitar infecções.',
      level: 'Intermediário',
    },
    {
      number: '08',
      title: 'Proteção de contas',
      tag: 'Proteção',
      description:
        'Veja práticas que ajudam a manter suas contas e informações pessoais mais protegidas.',
      level: 'Iniciante',
    },
    {
      number: '09',
      title: 'Wi-Fi público',
      tag: 'Privacidade',
      description:
        'Entenda os riscos de utilizar redes públicas e quais cuidados devem ser adotados.',
      level: 'Intermediário',
    },
    {
      number: '10',
      title: 'Privacidade e proteção de dados',
      tag: 'Privacidade',
      description:
        'Aprenda boas práticas para preservar sua privacidade durante o uso de serviços digitais.',
      level: 'Iniciante',
    },
  ]

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
                Explore conteúdos sobre segurança digital e descubra
                como reconhecer ameaças, proteger seus dados e tomar
                decisões mais seguras no ambiente digital.
              </p>

              <div className="contents-hero-meta">
                <div>
                  <strong>10</strong>
                  <span>temas disponíveis</span>
                </div>

                <div>
                  <strong>3</strong>
                  <span>áreas de conhecimento</span>
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
                  Comece pelos conceitos básicos e avance conforme
                  seu conhecimento aumenta.
                </p>
              </div>

              <div className="overview-progress">
                <div className="progress-label">
                  <span>Trilha de segurança</span>
                  <span>10 conteúdos</span>
                </div>

                <div className="progress-bar">
                  <span />
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
                Os conteúdos do Web Guarda foram organizados para
                apresentar esses conceitos de maneira simples,
                objetiva e acessível.
              </p>
            </div>
          </div>
        </section>

        {/* TEMAS */}
        <section className="topics-section">
          <div className="container">
            <div className="topics-header">
              <div>
                <span className="section-label">
                  BIBLIOTECA DE CONTEÚDOS
                </span>

                <h2>
                  Escolha um tema
                </h2>
              </div>

              <p>
                Explore os conteúdos disponíveis e conheça as
                principais ameaças e práticas de proteção digital.
              </p>
            </div>

            <div className="topics-list">
              {topics.map((topic) => (
                <article
                  className="content-topic-card"
                  key={topic.number}
                >
                  <div className="topic-number">
                    {topic.number}
                  </div>

                  <div className="topic-main">
                    <div className="topic-heading">
                      <div>
                        <span className="topic-tag">
                          {topic.tag}
                        </span>

                        <h3>{topic.title}</h3>
                      </div>

                      <span className="topic-level">
                        {topic.level}
                      </span>
                    </div>

                    <p>{topic.description}</p>

                    <button
                      type="button"
                      className="topic-link"
                    >
                      Explorar conteúdo
                      <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* POR ONDE COMEÇAR */}
        <section className="start-section">
          <div className="container">
            <div className="start-box">
              <div className="start-heading">
                <span className="section-label">
                  POR ONDE COMEÇAR?
                </span>

                <h2>
                  Nunca estudou sobre
                  <br />
                  segurança digital?
                </h2>

                <p>
                  Não tem problema. Recomendamos começar pelos
                  conceitos básicos e avançar aos poucos.
                </p>
              </div>

              <div className="recommended-topics">
                <div className="recommended-item">
                  <span>01</span>

                  <div>
                    <strong>Phishing</strong>
                    <p>
                      Aprenda a reconhecer tentativas de fraude.
                    </p>
                  </div>
                </div>

                <div className="recommended-item">
                  <span>02</span>

                  <div>
                    <strong>Senhas seguras</strong>
                    <p>
                      Proteja suas contas com boas práticas.
                    </p>
                  </div>
                </div>

                <div className="recommended-item">
                  <span>03</span>

                  <div>
                    <strong>Golpes virtuais</strong>
                    <p>
                      Conheça golpes comuns na internet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                O Web Guarda apresenta os conteúdos de forma
                progressiva para facilitar a compreensão.
              </p>
            </div>

            <div className="learning-steps">
              <div className="learning-step">
                <span className="step-number">01</span>

                <div>
                  <h3>Conheça</h3>

                  <p>
                    Entenda o que são as principais ameaças
                    presentes no ambiente digital.
                  </p>
                </div>
              </div>

              <div className="learning-step">
                <span className="step-number">02</span>

                <div>
                  <h3>Identifique</h3>

                  <p>
                    Aprenda a reconhecer sinais que podem indicar
                    uma tentativa de golpe ou fraude.
                  </p>
                </div>
              </div>

              <div className="learning-step">
                <span className="step-number">03</span>

                <div>
                  <h3>Proteja-se</h3>

                  <p>
                    Coloque em prática hábitos que tornam sua
                    experiência digital mais segura.
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
                <span className="section-label">
                  TESTE SEUS CONHECIMENTOS
                </span>

                <h2>
                  Já conhece os conceitos?
                  <br />
                  Faça sua avaliação.
                </h2>

                <p>
                  Responda algumas perguntas e descubra como está
                  seu conhecimento sobre segurança digital.
                </p>
              </div>

              <Button onClick={() => navigate('/avaliacao-final')}>
                Fazer avaliação final
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Conteudos
