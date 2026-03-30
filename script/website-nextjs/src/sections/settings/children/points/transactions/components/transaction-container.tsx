import { PointsHistoryItemType } from '@/apis/client/points/type'
import TransactionCard from './transaction-card'
import NoRecordBlock from '@/components/custom/no-record-block'
import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  historyList: PointsHistoryItemType[]
}>

function TransactionContainer({ historyList, className }: Props) {
  if (!historyList || historyList.length === 0) {
    return <NoRecordBlock />
  }

  return (
    <div className={cn(className, 'px-4 640:px-5 1440:px-[75px]')}>
      <div className="flex flex-col gap-y-1.5 1440:gap-y-4">
        {historyList.map((history, index) => {
          const key = `${history.type}-${history.createTime}-${index}`
          return (
            <TransactionCard
              key={key}
              title={history.source}
              date={history.createTime}
              point={history.pointsChange}
              type={history.type}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TransactionContainer
