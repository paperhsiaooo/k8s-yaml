import RewardBlock from '@/sections/products/children/product/children/checkout/components/reward-block'
import { formatISO9075 } from 'date-fns'
import { memo } from 'react'
import { getDeliveryMethodName } from '@/utils/delivery-method'

type ShipmentTrackingCardProps = {
  imageUrl: string
  name: string
  orderId: string
  quantity: number
  price: number
  deliveryMethod: string
  estimatedShipmentDate: number | null
  completedDate: number | null
}

function ShipmentTrackingCard({
  imageUrl = '',
  name = '',
  orderId = '',
  quantity = 0,
  price = 0,
  deliveryMethod = '',
  estimatedShipmentDate = null,
  completedDate = null,
}: ShipmentTrackingCardProps) {
  return (
    <div className="rounded-[30px] shadow-[0_0_10px_0_#f6cfb2] p-4 1440:p-5 1440:rounded-[50px]">
      <RewardBlock
        imageUrl={imageUrl}
        name={name}
        quantity={quantity}
        price={price}
        className="mb-4 640:mb-2.5"
      />

      <div className="setting-gradient-block-01">
        <div className="setting-block-02">
          <p className="setting-title-02">訂單編號</p>
          <p className="setting-label-02">{orderId}</p>
        </div>

        <div className="setting-block-02">
          <p className="setting-title-02">運送方式</p>
          <p className="setting-label-02">{getDeliveryMethodName(deliveryMethod)}</p>
        </div>

        <div className="setting-block-02">
          <p className="setting-title-02">預計出貨時間</p>
          <p className="setting-label-02">
            {estimatedShipmentDate ? formatISO9075(new Date(estimatedShipmentDate)) : '-'}
          </p>
        </div>

        <div className="setting-block-02">
          <p className="setting-title-02">訂單出貨時間</p>
          <p className="setting-label-02">
            {completedDate ? formatISO9075(new Date(completedDate)) : '-'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(ShipmentTrackingCard)
