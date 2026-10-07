import "../styles/pages/login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import webGuardaIcon from "../assets/web-guarda-icon.png";

const API_URL = "http://localhost:3000/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "E-mail ou senha inválidos.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      navigate("/avaliacao");
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <section className="login-brand">
          <Link to="/" className="login-logo">
            <img src={webGuardaIcon} alt="Web Guarda" />

            <span>Web Guarda</span>
          </Link>

          <div className="login-intro">
            <span className="login-label">BEM-VINDO DE VOLTA</span>

            <h1>
              Continue sua jornada
              <br />
              de segurança digital.
            </h1>

            <p>
              Acesse sua conta para continuar aprendendo, realizar avaliações
              e acompanhar sua evolução no Web Guarda.
            </p>
          </div>

          <div className="login-security">
            <div className="login-security-icon">✓</div>

            <div>
              <strong>Seu conhecimento protege você.</strong>

              <span>
                Aprenda, pratique e navegue com mais segurança.
              </span>
            </div>
          </div>
        </section>

        <section className="login-card">
          <div className="login-card-header">
            <h2>Entrar</h2>

            <p>Informe seus dados para acessar sua conta.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="senha">Senha</label>
              </div>

              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>

            {erro && <p className="login-error">{erro}</p>}

            <button
              type="submit"
              className="login-button"
              disabled={carregando}
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <p className="login-register">
            Ainda não possui uma conta?

            <Link to="/cadastro">Criar minha conta</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Login;
