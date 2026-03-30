import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  id?: string
  label?: string
  isActive?: boolean
  handleOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}>

function Button2({ id, label, isActive = false, className, handleOnClick }: Props) {
  return (
    <button
      type="button"
      data-value={id}
      onClick={handleOnClick}
      className={cn(
        'inline-block cursor-pointer duration-150 rounded-full transition-all',
        className,
        !isActive && 'tag-category-btn text-yile-950',
        isActive && 'tag-category-btn-active !text-yile-100'
      )}
    >
      {label}
    </button>
  )
}

export default Button2
