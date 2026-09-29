import '../styles/components/navbar.css'

import Button from './Button'

import webGuardaIcon from '../assets/web-guarda-icon.png'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <a
          href="#inicio"
          className="navbar-logo"
        >
          <span className="navbar-logo-icon">
            <img
              src={webGuardaIcon}
              alt="Web Guarda"
            />
          </span>

          <span>Web Guarda</span>
        </a>

        <nav className="navbar-links">
          <a href="#inicio">
            Início
          </a>

          <a href="#sobre">
            Sobre
          </a>

          <a href="#conteudos">
            Conteúdos
          </a>

          <a href="#avaliacao">
            Avaliação
          </a>
        </nav>

        <Button variant="outline">
          Entrar
        </Button>
      </div>
    </header>
  )
}

export default Navbar