import '../styles/components/contents-navbar.css'

import { Link } from 'react-router-dom'
import Logo from "./Logo";

function ContentsNavbar() {
  return (
    <header className="contents-navbar">
      <div className="container contents-navbar-content">

        <Link
          to="/"
          className="contents-navbar-back"
        >
          ←
          <span>Voltar para o início</span>
        </Link>

        <Link
          to="/conteudos"
          className="contents-navbar-logo"
        >
          <Logo />
        </Link>

        <div className="contents-navbar-section">
          <span className="contents-navbar-label">
            Área educativa
          </span>

          <span className="contents-navbar-title">
            Conteúdos
          </span>
        </div>

      </div>
    </header>
  )
}

export default ContentsNavbar
