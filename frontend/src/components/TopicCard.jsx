import '../styles/components/topic-card.css'

function TopicCard({
  icon,
  title,
  description,
}) {
  return (
    <article className="topic-card">
      <div className="topic-card-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  )
}

export default TopicCard