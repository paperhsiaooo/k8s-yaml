'use client'

import Button1 from '@/components/custom/button/button1'
import RewardBlock from '@/sections/products/children/product/children/checkout/components/reward-block'
import { getCountyNameById, getDistrictNameById } from '@/utils/regions'
import { formatISO9075 } from 'date-fns'
import { PiArrowCircleLeftBold } from 'react-icons/pi'
import useDetailView from '../hook/use-detail-view'
import Loading from '@/components/custom/loading'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'
import { CONFIG } from '@/config-global'
import { getDeliveryMethodName } from '@/utils/delivery-method'
import { useMemo } from 'react'

type ShipmentTrackingDetailViewProps = {
  orderId: string
}

function ShipmentTrackingDetailView({ orderId }: ShipmentTrackingDetailViewProps) {
  const { orderPhysicalDetail, isLoading, handleBackToList } = useDetailView({ orderId })

  const renderRecipientTotalAddress = useMemo(() => {
    // 可能會有特殊流程，導致縣市或區域 id 不存在，因此需要回傳 '-'（ex: 後台直接協助 VIP 玩家下單）
    if (!orderPhysicalDetail?.recipientCountyId || !orderPhysicalDetail?.recipientDistrictId)
      return '-'

    return `${getCountyNameById(orderPhysicalDetail.recipientCountyId)}${getDistrictNameById(
      orderPhysicalDetail.recipientDistrictId
    )}${orderPhysicalDetail.recipientDetailAddress}`
  }, [
    orderPhysicalDetail?.recipientCountyId,
    orderPhysicalDetail?.recipientDistrictId,
    orderPhysicalDetail?.recipientDetailAddress,
  ])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="setting-panel-wrap">
      <div className="setting-panel-frame mb-4 1440:mb-9">
        <CategoryTitleBox>
          <CategoryTitle title="實體好禮出貨詳情" />
        </CategoryTitleBox>

        <div className="flex flex-col px-4 pb-4 640:px-6 640:pb-6 1440:px-[74px] 1440:pb-16">
          <RewardBlock
            imageUrl={orderPhysicalDetail.productImageUrl}
            name={orderPhysicalDetail.productName}
            quantity={orderPhysicalDetail.quantity}
            price={orderPhysicalDetail.productPrice}
            className="mb-4"
          />

          <div className="setting-gradient-block-01">
            <div className="setting-block-02">
              <p className="setting-title-02">訂單編號</p>
              <p className="setting-label-02">{orderPhysicalDetail.orderId}</p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">運送方式</p>
              <p className="setting-label-02">
                {getDeliveryMethodName(orderPhysicalDetail.deliveryMethod)}
              </p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">收件人姓名</p>
              <p className="setting-label-02">{orderPhysicalDetail.recipientName || '-'}</p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">收件人手機</p>
              <p className="setting-label-02">{orderPhysicalDetail.recipientMobilePhone || '-'}</p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">收件人市話</p>
              <p className="setting-label-02">{orderPhysicalDetail.recipientHomePhone || '-'}</p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">寄送地址</p>
              <p className="setting-label-02">{renderRecipientTotalAddress}</p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">預計出貨時間</p>
              <p className="setting-label-02">
                {orderPhysicalDetail.estimatedShipmentDate
                  ? formatISO9075(new Date(orderPhysicalDetail.estimatedShipmentDate))
                  : '-'}
              </p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">訂單出貨時間</p>
              <p className="setting-label-02">
                {orderPhysicalDetail.completedDate
                  ? formatISO9075(new Date(orderPhysicalDetail.completedDate))
                  : '-'}
              </p>
            </div>
          </div>

          <div className="setting-gradient-block-01">
            <div className="setting-block-02">
              <p className="setting-title-02">商品介紹</p>
              <p className="setting-label-02">{orderPhysicalDetail.productDescription}</p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">注意事項</p>
              <p
                className="setting-label-02"
                dangerouslySetInnerHTML={{ __html: orderPhysicalDetail.note }}
              />
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">客服資訊</p>
              <p className="setting-label-02">{CONFIG.site.serviceEmail}</p>
            </div>
          </div>
        </div>
      </div>

      <Button1
        onClick={handleBackToList}
        type="button"
        className={`mx-auto px-6 py-3 gap-x-4 border-4 1440:px-8 1440:py-6`}
        startIcon={<PiArrowCircleLeftBold className="text-2xl 1440:text-5xl text-yile-950" />}
      >
        <p className="mob-button-small 1440:web-button-bold text-yile-950">返回列表</p>
      </Button1>
    </div>
  )
}

export default ShipmentTrackingDetailView
