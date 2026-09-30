import '../styles/pages/login.css'

function Login() {
  return (
    <main className="login-page">
      <div className="login-container">
        <section className="login-brand">
          <a href="/" className="login-logo">
            <img
              src="../src/assets/web-guarda-icon.png"
              alt="Web Guarda"
            />

            <span>Web Guarda</span>
          </a>

          <div className="login-intro">
            <span className="login-label">
              BEM-VINDO DE VOLTA
            </span>

            <h1>
              Continue sua jornada
              <br />
              de segurança digital.
            </h1>

            <p>
              Acesse sua conta para continuar aprendendo,
              realizar avaliações e acompanhar sua evolução
              no Web Guarda.
            </p>
          </div>

          <div className="login-security">
            <div className="login-security-icon">
              ✓
            </div>

            <div>
              <strong>
                Seu conhecimento protege você.
              </strong>

              <span>
                Aprenda, pratique e navegue com mais segurança.
              </span>
            </div>
          </div>
        </section>

        <section className="login-card">
          <div className="login-card-header">
            <h2>Entrar</h2>

            <p>
              Informe seus dados para acessar sua conta.
            </p>
          </div>

          <form className="login-form">
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
              <div className="password-label">
                <label htmlFor="senha">
                  Senha
                </label>

              </div>

              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              Entrar
            </button>
          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <p className="login-register">
            Ainda não possui uma conta?

            <a href="/cadastro">
              Criar minha conta
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}

export default Login