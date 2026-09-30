import '../styles/components/progress-bar.css'

function ProgressBar({
  current,
  total,
}) {
  const progress = Math.round(
    (current / total) * 100
  )

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>
          Questão {current} de {total}
        </span>

        <strong>
          {progress}%
        </strong>
      </div>

      <div
        className="progress-track"
        aria-label={`Progresso: ${progress}%`}
      >
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar