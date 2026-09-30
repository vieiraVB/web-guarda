import '../styles/components/evaluation-header.css'

function EvaluationHeader({ title }) {
  return (
    <header className="evaluation-header">
      <div className="evaluation-header-content">
        <a href="/" className="evaluation-logo">
          <img
            src="../src/assets/web-guarda-icon.png"
            alt="Web Guarda"
          />

          <span>Web Guarda</span>
        </a>

        <span className="evaluation-title">
          {title}
        </span>
      </div>
    </header>
  )
}

export default EvaluationHeader