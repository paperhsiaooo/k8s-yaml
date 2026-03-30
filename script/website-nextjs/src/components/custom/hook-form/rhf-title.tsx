import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  string: string
  required?: boolean
  htmlFor?: string
}>

function RHFTitle({ string, className, required = false, htmlFor }: Props) {
  return (
    <div className="flex flex-row items-center gap-x-1">
      <Label htmlFor={htmlFor} className={cn('text-black-1 leading-normal', className)}>
        {string}
      </Label>
      {required && <p className="text-red-500">*</p>}
    </div>
  )
}

export default RHFTitle
