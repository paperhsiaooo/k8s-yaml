type TitleProps = {
  title: string
  description: string
}

function Title({ title, description }: TitleProps) {
  return (
    <div className="pt-4 sm:pt-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default Title
