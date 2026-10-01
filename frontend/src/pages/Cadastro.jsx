import '../styles/pages/cadastro.css'

import { Link, useNavigate } from 'react-router-dom'

function Cadastro() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/avaliacao-inicial')
  }

  return (
    <div className="cadastro-page">

      <main className="cadastro-main">
        <div className="container cadastro-container">
          <section className="cadastro-intro">
            <span className="cadastro-label">
              COMEÇE SUA JORNADA
            </span>

            <h1>
              Crie sua conta
              <br />
              no Web Guarda.
            </h1>

            <p>
              Cadastre-se para acessar os conteúdos educativos,
              realizar as avaliações e acompanhar sua evolução
              em segurança digital.
            </p>

            <div className="cadastro-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>

                <div>
                  <strong>Aprenda no seu ritmo</strong>
                  <span>
                    Acesse conteúdos sobre segurança digital.
                  </span>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">✓</span>

                <div>
                  <strong>Avalie seus conhecimentos</strong>
                  <span>
                    Descubra o quanto você já sabe sobre o tema.
                  </span>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">✓</span>

                <div>
                  <strong>Acompanhe sua evolução</strong>
                  <span>
                    Compare seus resultados ao longo da jornada.
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="cadastro-card">
            <div className="cadastro-card-header">
              <h2>Cadastre-se</h2>

              <p>
                Preencha seus dados para criar sua conta.
              </p>
            </div>

            <form className="cadastro-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">
                  Nome completo
                </label>

                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  E-mail
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div className="form-group">
                <label htmlFor="senha">
                  Senha
                </label>

                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Crie uma senha"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmar-senha">
                  Confirmar senha
                </label>

                <input
                  type="password"
                  id="confirmar-senha"
                  name="confirmar-senha"
                  placeholder="Digite a senha novamente"
                />
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="termos"
                  name="termos"
                />

                <label htmlFor="termos">
                  Concordo com os termos de utilização da plataforma.
                </label>
              </div>

              <button type="submit" className="Cadastro-button">
                Criar minha conta
              </button>
            </form>

            <p className="cadastro-login">
              Já possui uma conta?
              <Link to="/login">
                Entrar
              </Link>
            </p>
          </section>
        </div>
      </main>

    </div>
  )
}

export default Cadastro
