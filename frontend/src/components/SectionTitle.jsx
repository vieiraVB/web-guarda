import '../styles/components/section-title.css'

function SectionTitle({
  label,
  title,
  description,
}) {
  return (
    <div className="section-title">
      {label && (
        <span className="section-title-label">
          {label}
        </span>
      )}

      <h2>{title}</h2>

      {description && (
        <p>{description}</p>
      )}
    </div>
  )
}

export default SectionTitle