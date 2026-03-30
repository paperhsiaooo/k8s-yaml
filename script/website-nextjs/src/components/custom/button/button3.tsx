import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  type: 'button' | 'submit' | 'reset'
  disabled?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}>

function Button3({
  type = 'button',
  disabled,
  startIcon,
  endIcon,
  children,
  className,
  onClick,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'duration-200 [background-image:var(--color-gradient-05)] text-yile-200 hover:text-yile-100',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      {...rest}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  )
}

export default Button3
