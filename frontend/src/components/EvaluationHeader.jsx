import '../styles/components/evaluation-header.css'

import { Link } from 'react-router-dom'

import webGuardaIcon from '../assets/web-guarda-icon.png'

function EvaluationHeader({ title }) {
  return (
    <header className="evaluation-header">
      <div className="evaluation-header-content">
        <Link to="/" className="evaluation-logo">
          <img
            src={webGuardaIcon}
            alt="Web Guarda"
          />

          <span>Web Guarda</span>
        </Link>

        <span className="evaluation-title">
          {title}
        </span>
      </div>
    </header>
  )
}

export default EvaluationHeader
