import "../styles/components/footer.css";
import webGuardaIcon from "../assets/web-guarda-icon.png";
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="footer-logo-icon">
            <img src={webGuardaIcon} alt="Web Guarda" />
          </span>
          <span className="footer-info">
            Segurança digital por meio da informação.
          </span>
        </div>

        <div className="footer-info">
          <span>Projeto de Extensão</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
