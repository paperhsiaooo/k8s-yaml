import RewardBlock from '@/sections/products/children/product/children/checkout/components/reward-block'
import { formatISO9075 } from 'date-fns'
import { memo } from 'react'

type VirtualTreasureHistoryCardProps = {
  orderId: string
  userId: string
  nickname: string
  productName: string
  quantity: number
  price: number
  imageUrl: string
  createTime: number
}

function VirtualTreasureHistoryCard({
  imageUrl = '',
  productName,
  orderId,
  quantity,
  price,
  userId,
  nickname,
  createTime,
}: VirtualTreasureHistoryCardProps) {
  return (
    <div className="rounded-[30px] shadow-[0_0_10px_0_#f6cfb2] p-4 1440:p-5 1440:rounded-[50px]">
      <RewardBlock
        imageUrl={imageUrl}
        name={productName}
        quantity={quantity}
        price={price}
        className="mb-4"
      />

      <div className="setting-gradient-block-01">
        <div className="setting-block-02">
          <p className="setting-title-02">訂單編號</p>
          <p className="setting-label-02">{orderId}</p>
        </div>

        <div className="setting-block-02">
          <p className="setting-title-02">領獎帳號</p>
          <p className="setting-label-02">{`${nickname}｜${userId}`}</p>
        </div>

        <div className="setting-block-02">
          <p className="setting-title-02">訂單成立時間</p>
          <p className="setting-label-02">
            {createTime ? formatISO9075(new Date(createTime)) : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(VirtualTreasureHistoryCard)
