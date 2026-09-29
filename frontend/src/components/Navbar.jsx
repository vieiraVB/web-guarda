import "../styles/components/navbar.css";

import { Link } from "react-router-dom";

import Button from "./Button";
import Logo from "./Logo";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <Logo />
        </Link>

        <nav className="navbar-links">
          <a href="#inicio">Início</a>

          <a href="#sobre">Sobre</a>

          <Link to="/conteudos">Conteúdos</Link>

          <Link to="/avaliacao-inicial">Avaliação</Link>
        </nav>

        <Link to="/login">
          <Button variant="outline">Entrar</Button>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
