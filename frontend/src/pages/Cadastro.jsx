import '../styles/pages/cadastro.css'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../lib/api'

function Cadastro() {
  const navigate = useNavigate()
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const [confirmacaoVisivel, setConfirmacaoVisivel] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nome = String(formData.get('nome') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const senha = String(formData.get('senha') || '')
    const confirmarSenha = String(formData.get('confirmar-senha') || '')

    setErro('')
    setSucesso('')

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (senha !== confirmarSenha) {
      setErro('A confirmação da senha não corresponde à senha informada.')
      return
    }

    setCarregando(true)

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível criar sua conta.')
      }

      setSucesso(data.message || 'Conta criada com sucesso. Redirecionando para o login...')
      window.setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      setErro(error instanceof TypeError
        ? 'Não foi possível conectar ao servidor. Verifique se a API está em execução e tente novamente.'
        : error.message)
    } finally {
      setCarregando(false)
    }
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
                  required
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
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="senha">
                  Senha
                </label>

                <div className="password-input-wrapper">
                  <input
                    type={senhaVisivel ? 'text' : 'password'}
                    id="senha"
                    name="senha"
                    placeholder="Crie uma senha"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={senhaVisivel ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={() => setSenhaVisivel(!senhaVisivel)}
                  >
                    {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmar-senha">
                  Confirmar senha
                </label>

                <div className="password-input-wrapper">
                  <input
                    type={confirmacaoVisivel ? 'text' : 'password'}
                    id="confirmar-senha"
                    name="confirmar-senha"
                    placeholder="Digite a senha novamente"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={confirmacaoVisivel ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={() => setConfirmacaoVisivel(!confirmacaoVisivel)}
                  >
                    {confirmacaoVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {erro && <p role="alert">{erro}</p>}
              {sucesso && <p role="status">{sucesso}</p>}

              <button type="submit" className="Cadastro-button" disabled={carregando}>
                {carregando ? 'Criando conta...' : 'Criar minha conta'}
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
