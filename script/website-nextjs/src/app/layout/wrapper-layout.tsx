import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  children: React.ReactNode
}>

function WrapperLayout({ children, className }: Props) {
  return <div className={cn('wrapper w-full', className)}>{children}</div>
}

export default WrapperLayout
