import { paths } from '@/routes/path'
import Link from 'next/link'
import ShipmentTrackingCard from './shipment-tracking-card'
import { GetPhysicalHistoryResType } from '@/apis/client/orders/physical/type'
import NoRecordBlock from '@/components/custom/no-record-block'

type Props = {
  historyList: GetPhysicalHistoryResType
}

function ShipmentContainer({ historyList }: Props) {
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
              href={`${paths.settings.children['shipment-tracking'].children.detail.nav.path}/${history.orderId}`}
            >
              <ShipmentTrackingCard
                imageUrl={history.imageUrl}
                name={history.name}
                orderId={history.orderId}
                quantity={history.quantity}
                price={history.price}
                deliveryMethod={history.deliveryMethod}
                estimatedShipmentDate={history.estimatedShipmentDate}
                completedDate={history.completedDate}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default ShipmentContainer
