import { memo } from 'react'
import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import { formatWithCommas } from '@/utils/number'
import IconPoint from '@/components/custom/icons/icon-point'
import AsyncImage from '@/components/custom/image/asyncImage'

type Props = WithClassName<{
  imageUrl: string
  name: string
  quantity: number
  price: number
}>

function RewardBlock({ imageUrl = '', name = '', quantity = 0, price = 0, className }: Props) {
  return (
    <div className={cn('flex flex-col 640:flex-row 640:gap-x-6 1440:gap-x-[30px]', className)}>
      <div className="relative rounded-2xl overflow-hidden aspect-square w-[130px] mb-2 640:mb-0 640:w-[148px] 1440:w-[210px]">
        <AsyncImage
          mode="cdn"
          src={imageUrl}
          alt={`${name} 商品圖片`}
          fill
          imageClassName="object-cover"
        />
      </div>
      <div>
        <div className="flex flex-col mb-3 1440:mb-[30px]">
          <p className="mob-h3-bold 1440:web-gift-h1-bold">{name}</p>
          <p className="mob-text text-gray 1440:text-text">{`數量：x${quantity}`}</p>
          <p className="mob-text text-gray 1440:text-text">{`點數：${formatWithCommas(price)}`}</p>
        </div>
        <div className="flex items-center">
          <span className="text-black-1 mob-text-bold-02 1440:web-text-bold-01">總計點數：</span>
          <IconPoint className="w-7 inline-block mr-1.5 1440:w-7" />
          <span className="text-yile-900 mob-em-small 1440:web-em-bold">
            {formatWithCommas(quantity * price)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(RewardBlock)
