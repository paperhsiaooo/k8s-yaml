import { WithClassName } from '@/types/common'
import { Spinner } from '../ui/shadcn-io/spinner'
import { cn } from '@/lib/utils'

type Props = WithClassName

function Loading({ className, ...props }: Props) {
  return (
    <div className={cn('flex-1 flex items-center justify-center', className)} {...props}>
      <Spinner size={40} className="text-yile-900" variant="infinite" />
    </div>
  )
}

export default Loading
