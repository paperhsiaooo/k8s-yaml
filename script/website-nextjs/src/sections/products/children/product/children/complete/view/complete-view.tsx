'use client'

import SuccessCelebration from '@/components/custom/success-celebration'
import CompleteActions from '@/components/custom/complete-actions'
import useCompleteView from '../hook/use-complete-view'
import { PRODUCT_TYPE } from '@/constants/product-type'
import PhysicalDeliveryDetails from '@/components/custom/delivery/physical/physical-delivery-details'
import VirtualTreasureDetail from '@/components/custom/delivery/virtual-treasure/virtual-treasure-detail'
import Loading from '@/components/custom/loading'

type Props = {
  orderId: string
}

function CompleteView({ orderId }: Props) {
  const { type, physicalData, virtualTreasureData, isLoading, handlerViewDetailButtonClick } =
    useCompleteView({
      orderId,
    })

  if (isLoading) {
    return <Loading className="bg-yile-50" />
  }

  return (
    <main className="bg-yile-100 footer-padding">
      <div className="relative py-6 pt-40 px-4 max-w-375 mx-auto flex flex-col gap-y-2 640:pt-44 640:max-w-640 1440:gap-y-3 1440:max-w-1440 1440:pt-[480px]">
        {/* 慶祝成功區塊 */}
        <SuccessCelebration className="absolute top-0 left-1/2 w-full -translate-x-1/2 z-0" />

        <div className="relative z-10">
          {/* 寄送資訊區塊 */}
          {type === PRODUCT_TYPE.Physical && (
            <PhysicalDeliveryDetails
              orderId={orderId}
              deliveryMethod={physicalData.deliveryType}
              createTime={physicalData.createTime}
              recipientName={physicalData.recipientName}
              recipientPhone={physicalData.recipientPhone}
              recipientCountyId={physicalData.recipientCountyId}
              recipientDistrictId={physicalData.recipientDistrictId}
              recipientCityPhone={physicalData.recipientCityPhone || '-'}
              recipientAddress={physicalData.recipientDetailAddress}
              productName={physicalData.product.name}
              productImageUrl={physicalData.product.imageUrl}
              productPrice={physicalData.product.price}
              productQuantity={physicalData.product.quantity}
              note={physicalData.note}
            />
          )}

          {/* 虛擬寶物區塊 */}
          {type === PRODUCT_TYPE.VirtualTreasure && (
            <VirtualTreasureDetail
              orderId={orderId}
              productName={virtualTreasureData.product.name}
              productImageUrl={virtualTreasureData.product.imageUrl}
              productPrice={virtualTreasureData.product.price}
              productQuantity={virtualTreasureData.product.quantity}
              nickname={virtualTreasureData.nickName}
              userId={virtualTreasureData.userId}
              note={virtualTreasureData.note}
            />
          )}
        </div>

        {/* 操作區塊 */}
        <CompleteActions onButtonClick={handlerViewDetailButtonClick} />
      </div>
    </main>
  )
}

export default CompleteView
