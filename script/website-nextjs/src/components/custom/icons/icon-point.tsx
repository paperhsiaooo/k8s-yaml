import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import Image from 'next/image'
import { memo } from 'react'

type Props = WithClassName

function IconPoint({ className }: Props) {
  return (
    <div className={cn('relative', className)}>
      <Image src={'/images/icons/coin-icon-01.webp'} alt="icon-point" width={500} height={456} />
    </div>
  )
}

export default memo(IconPoint)
