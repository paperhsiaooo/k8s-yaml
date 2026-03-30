import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import { memo } from 'react'

type FilterButtonProps = WithClassName<{
  id: string
  label: string
  isActive?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}>

function FilterButton({ id, isActive = false, label, className, onClick }: FilterButtonProps) {
  return (
    <button key={id} data-value={id} className={cn('cursor-pointer', className)} onClick={onClick}>
      <p
        className={cn(
          'mob-button-small text-nowrap mb-1 text-gray 1440:web-button-small 1440:mb-3',
          isActive && 'text-yile-700'
        )}
      >
        {label}
      </p>
      <p className={cn('rounded-full w-full h-1.5', isActive && 'bg-yile-700')} />
    </button>
  )
}

export default memo(FilterButton)
