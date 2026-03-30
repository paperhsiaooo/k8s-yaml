import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import { memo } from 'react'

type NoRecordProps = WithClassName<{
  children?: React.ReactNode
}>

function NoRecord({ children, className }: NoRecordProps) {
  return (
    <div className={cn('border-[1px] border-gray rounded-[10px] p-2', className)}>{children}</div>
  )
}

export default memo(NoRecord)
