import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  label?: string
  isActive?: boolean
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}>

function PaginationButton({
  label = '',
  isActive = false,
  disabled = false,
  className,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'cursor-pointer rounded-full size-7 flex items-center justify-center bg-yile-50 transition-colors duration-150',
        disabled && 'opacity-50 cursor-not-allowed',
        isActive && 'bg-transparent border-[3px] border-amber-500',
        className
      )}
    >
      <p
        className={cn(
          'relative top-[1px] mob-text-bold-01 640:mob-em-small leading-none text-gray',
          isActive && 'text-black-1'
        )}
      >
        {label}
      </p>
    </button>
  )
}

export default PaginationButton
