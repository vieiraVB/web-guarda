import '../styles/components/question-card.css'

function QuestionCard({
  question,
  options,
  selectedOption,
  onSelect,
}) {
  return (
    <div className="question-card">
      <div className="question-card-header">
        <span className="question-number">
          Questão
        </span>

        <h2>{question}</h2>
      </div>

      <div className="question-options">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`question-option ${
              selectedOption === option.id
                ? 'selected'
                : ''
            }`}
            onClick={() => onSelect(option.id)}
          >
            <span className="option-letter">
              {option.letter}
            </span>

            <span className="option-text">
              {option.text}
            </span>

            <span className="option-radio">
              {selectedOption === option.id && '✓'}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard