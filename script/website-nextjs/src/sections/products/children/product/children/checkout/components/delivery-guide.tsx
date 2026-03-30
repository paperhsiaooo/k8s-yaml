import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import { memo } from 'react'

type Props = WithClassName<{
  children: React.ReactNode
}>

function DeliveryGuide({ children, className }: Props) {
  return (
    <div className={cn(className)}>
      <p className="w-full h-[2px] bg-yile-500 mb-4 1440:mb-7 1440:h-1" />
      {children}
    </div>
  )
}

export default memo(DeliveryGuide)
