import { memo } from 'react'

interface CardProps {
  title: string
  description: string
  onClick?: () => void
}

const Card = memo(({ title, description, onClick }: CardProps) => {
  return (
    <div
      className="shadow-md shadow-gray-400 rounded-xl p-2 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      <h4 className="text-sm font-bold text-center">{title}</h4>
      <p className="text-xs text-center">{description}</p>
    </div>
  )
})

Card.displayName = 'Card'

export default Card
