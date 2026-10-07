import "../styles/components/navbar.css";

import { Link, useNavigate } from "react-router-dom";

import Button from "./Button";
import Logo from "./Logo";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const autenticado = token && tokenAindaValido(token);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

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

          <Link to="/avaliacao">Avaliação</Link>
        </nav>

        {autenticado ? (
          <div className="navbar-account">
            <span className="navbar-user-name">
              {nomeUsuario() || "Minha conta"}
            </span>
            <Button variant="outline" onClick={sair}>Sair</Button>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="outline">Entrar</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

function tokenAindaValido(token) {
  try {
    const segmento = token.split(".")[1];
    const base64 = segmento.replace(/-/g, "+").replace(/_/g, "/").padEnd(
      Math.ceil(segmento.length / 4) * 4,
      "=",
    );
    const payload = JSON.parse(atob(base64));
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function nomeUsuario() {
  try {
    return JSON.parse(localStorage.getItem("usuario") || "null")?.nome;
  } catch {
    return null;
  }
}

export default Navbar;
