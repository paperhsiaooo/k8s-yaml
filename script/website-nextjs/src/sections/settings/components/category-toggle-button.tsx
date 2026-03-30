import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

type CategoryToggleButtonProps = {
  title: string
  href: string
  isActive?: boolean
}

function CategoryToggleButton({ title, href, isActive = false }: CategoryToggleButtonProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex-1 bg-white rounded-sm text-center',
        isActive && 'bg-gray-200 text-white'
      )}
    >
      <div className="p-1">{title}</div>
    </Link>
  )
}

export default CategoryToggleButton
