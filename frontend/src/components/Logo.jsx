import '../styles/components/logo.css'

import logoIcon from '../assets/web-guarda-icon.png'

function Logo() {
  return (
    <span className="logo">
      <img
        src={logoIcon}
        alt="Web Guarda"
        className="logo-icon"
      />

      <span className="logo-text">
        Web Guarda
      </span>
    </span>
  )
}

export default Logo