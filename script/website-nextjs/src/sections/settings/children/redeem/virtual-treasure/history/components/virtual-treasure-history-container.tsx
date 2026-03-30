import { paths } from '@/routes/path'
import Link from 'next/link'
import { GetVirtualTreasureHistoryResType } from '@/apis/client/orders/virtual-treasure/type'
import VirtualTreasureHistoryCard from './virtual-treasure-history-card'
import NoRecordBlock from '@/components/custom/no-record-block'

type Props = {
  historyList: GetVirtualTreasureHistoryResType
}

function VirtualTreasureHistoryContainer({ historyList }: Props) {
  if (!historyList || historyList.length === 0) {
    return <NoRecordBlock />
  }

  return (
    <>
      {historyList.length > 0 && (
        <div className="flex flex-col px-4 pb-4 gap-y-2.5 1440:gap-y-4 640:px-6 640:pb-6 1440:px-[74px] 1440:pb-16">
          {historyList.map((history) => (
            <Link
              key={history.orderId}
              href={`${paths.settings.children.redeem.children['virtual-treasure'].children.detail.nav.path}/${history.orderId}`}
            >
              <VirtualTreasureHistoryCard
                orderId={history.orderId}
                userId={history.userId}
                nickname={history.nickname}
                productName={history.productName}
                quantity={history.quantity}
                price={history.price}
                imageUrl={history.imageUrl}
                createTime={history.createTime}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default VirtualTreasureHistoryContainer
