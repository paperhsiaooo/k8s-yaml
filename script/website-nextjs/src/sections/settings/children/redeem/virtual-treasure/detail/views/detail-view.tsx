'use client'

import Button1 from '@/components/custom/button/button1'
import RewardBlock from '@/sections/products/children/product/children/checkout/components/reward-block'
import { formatISO9075 } from 'date-fns'
import { PiArrowCircleLeftBold } from 'react-icons/pi'
import useDetailView from '../hook/use-detail-view'
import Loading from '@/components/custom/loading'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'
import { CONFIG } from '@/config-global'

type Props = {
  orderId: string
}

function DetailView({ orderId }: Props) {
  const { orderVirtualTreasureDetail, isLoading, handleBackToList } = useDetailView(orderId)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="setting-panel-wrap">
      <div className="setting-panel-frame mb-4 1440:mb-9">
        <CategoryTitleBox>
          <CategoryTitle title="虛寶兌換詳情" />
        </CategoryTitleBox>

        <div className="px-4 pb-4 flex flex-col 640:px-6 640:pb-6 1440:px-[74px] 1440:pb-16">
          <RewardBlock
            imageUrl={orderVirtualTreasureDetail.imageUrl}
            name={orderVirtualTreasureDetail.productName}
            quantity={orderVirtualTreasureDetail.quantity}
            price={orderVirtualTreasureDetail.price}
            className="mb-4"
          />

          <div className="setting-gradient-block-01">
            <div className="setting-block-02">
              <p className="setting-title-02">訂單編號</p>
              <p className="setting-label-02">{orderVirtualTreasureDetail.orderId}</p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">訂單成立時間</p>
              <p className="setting-label-02">
                {orderVirtualTreasureDetail.createTime
                  ? formatISO9075(new Date(orderVirtualTreasureDetail.createTime))
                  : '-'}
              </p>
            </div>
          </div>

          <div className="setting-gradient-block-01">
            <div className="setting-block-02">
              <p className="setting-title-02">商品介紹</p>
              <p className="setting-label-02">{orderVirtualTreasureDetail.description}</p>
            </div>

            <div className="setting-block-02">
              <p className="setting-title-02">注意事項</p>
              <p
                className="setting-label-02"
                dangerouslySetInnerHTML={{ __html: orderVirtualTreasureDetail.note }}
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

export default DetailView
