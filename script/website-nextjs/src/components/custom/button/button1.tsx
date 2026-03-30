'use client'

import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import Loading from '../loading'

type Props = WithClassName<{
  children: React.ReactNode
  type: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  onClick?: () => void
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}>

function Button1({ children, type, isLoading, className, onClick, startIcon, endIcon }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        className,
        `rounded-full border-yile-100 [background-image:var(--color-gradient-03)] flex justify-center items-center duration-200`,
        isLoading ? 'cursor-not-allowed' : 'cursor-pointer hover:border-yile-400'
      )}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {startIcon && <span className="flex items-center">{startIcon}</span>}
          {children}
          {endIcon && <span className="flex items-center">{endIcon}</span>}
        </>
      )}
    </button>
  )
}

export default Button1
