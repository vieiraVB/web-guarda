import '../styles/pages/home.css'

import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import TopicCard from '../components/TopicCard'

import webGuardaIcon from '../assets/web-guarda-icon.png'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <Navbar />

      <main>
        {/* HERO */}
        <section
          className="hero-section"
          id="inicio"
        >
          <div className="container hero-content">
            <div className="hero-text">
              <span className="hero-badge">
                Segurança digital para todos
              </span>

              <h1>
                Sua segurança começa
                <br />
                com informação.
              </h1>

              <p>
                Aprenda a identificar ameaças
                digitais, proteger seus dados e
                navegar pela internet com mais
                segurança.
              </p>

              <div className="hero-actions">
                <Button
                  variant="secondary"
                  onClick={() => {
                    document
                      .getElementById('conteudos')
                      ?.scrollIntoView({
                        behavior: 'smooth',
                      })
                  }}
                >
                  Conhecer conteúdos
                </Button>
              </div>
            </div>

            <div className="hero-illustration">
              <div className="shield">
                <img
                  src={webGuardaIcon}
                  alt="Ícone do Web Guarda"
                />
              </div>

              <div className="security-card card-one">
                <span className="security-card-icon">
                  ✓
                </span>
                Dados protegidos
              </div>

              <div className="security-card card-two">
                <span className="security-card-icon">
                  ✓
                </span>
                Navegação segura
              </div>

              <div className="security-card card-three">
                <span className="security-card-icon">
                  ✓
                </span>
                Segurança digital
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section
          className="info-section"
          id="sobre"
        >
          <div className="container">
            <SectionTitle
              label="WEB GUARDA"
              title="Conhecimento é a melhor proteção."
              description="O Web Guarda foi criado para ajudar você a entender os principais riscos presentes no ambiente digital e aprender como se proteger deles."
            />

            <div className="about-content">
              <div className="about-icon">
                <img
                  src={webGuardaIcon}
                  alt=""
                />
              </div>

              <div className="about-text">
                <h3>
                  Segurança digital de forma simples
                </h3>

                <p>
                  A internet faz parte da rotina de
                  muitas pessoas. Por isso, entender
                  seus riscos é fundamental para
                  utilizar a tecnologia de maneira
                  mais segura.
                </p>

                <p>
                  O Web Guarda reúne informações
                  educativas sobre ameaças digitais
                  comuns, ajudando você a reconhecer
                  situações de risco e tomar decisões
                  mais conscientes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDOS */}
        <section
          className="contents-section"
          id="conteudos"
        >
          <div className="container">
            <SectionTitle
              label="CONTEÚDOS EDUCATIVOS"
              title="Aprenda a se proteger no ambiente digital."
              description="Explore os principais temas de segurança digital e aprenda a reconhecer situações que podem colocar seus dados e suas contas em risco."
            />

            <div className="topic-grid">
              <TopicCard
                icon="01"
                title="Phishing"
                description="Aprenda a reconhecer mensagens, links e páginas falsas utilizadas para roubar informações."
              />

              <TopicCard
                icon="02"
                title="Senhas seguras"
                description="Descubra como criar, armazenar e proteger senhas mais fortes para suas contas."
              />

              <TopicCard
                icon="03"
                title="Golpes virtuais"
                description="Conheça golpes comuns e aprenda a identificar sinais de alerta antes de cair neles."
              />

              <TopicCard
                icon="04"
                title="Engenharia social"
                description="Entenda como criminosos utilizam técnicas de manipulação para obter informações."
              />

              <TopicCard
                icon="05"
                title="Proteção de contas"
                description="Aprenda boas práticas para aumentar a segurança das suas contas e informações pessoais."
              />

              <TopicCard
                icon="06"
                title="Wi-Fi público"
                description="Conheça os riscos de redes públicas e descubra como navegar com mais segurança."
              />
            </div>
          </div>
        </section>

        {/* AVALIAÇÃO */}
        <section
          className="evaluation-section"
          id="avaliacao"
        >
          <div className="container evaluation-content">
            <div>
              <span className="evaluation-label">
                TESTE SEUS CONHECIMENTOS
              </span>

              <h2>
                Você sabe se proteger
                <br />
                na internet?
              </h2>

              <p>
                Faça uma avaliação rápida para
                descobrir o quanto você já sabe
                sobre segurança digital.
              </p>

              <Button onClick={() => navigate('/avaliacao')}>
                Fazer avaliação
              </Button>
            </div>

            <div className="evaluation-card">
              <div className="evaluation-icon">
                ✓
              </div>

              <strong>
                Avaliação inicial
              </strong>

              <span>
                Descubra seu nível de conhecimento
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
