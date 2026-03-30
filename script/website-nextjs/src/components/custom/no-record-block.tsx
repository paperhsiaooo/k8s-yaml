import NoRecord from '@/components/custom/block/no-record'
import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import { memo } from 'react'

type Props = WithClassName<{
  label?: string
}>

function NoRecordBlock({ className, label = '無紀錄' }: Props) {
  return (
    <div className={cn('px-4 640:px-6 pb-4 640:pb-6', className)}>
      <NoRecord className="640:p-6">
        <p className="mob-button-small text-gray text-center">{label}</p>
      </NoRecord>
    </div>
  )
}

export default memo(NoRecordBlock)
