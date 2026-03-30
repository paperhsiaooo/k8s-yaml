import RewardBlock from '@/sections/products/children/product/children/checkout/components/reward-block'
import Link from 'next/link'
import { paths } from '@/routes/path'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'

interface VirtualTreasureDetailProps {
  orderId: string
  nickname: string
  userId: string
  productName: string
  productImageUrl: string
  productPrice: number
  productQuantity: number
  note: string
}

function VirtualTreasureDetail({
  orderId = '',
  nickname = '',
  userId = '',
  productName = '',
  productImageUrl = '',
  productPrice = 0,
  productQuantity = 0,
  note = '',
}: VirtualTreasureDetailProps) {
  return (
    <div className="setting-panel-wrap">
      <div className="setting-panel-frame">
        <CategoryTitleBox>
          <CategoryTitle title="虛擬寶物" />
        </CategoryTitleBox>

        <div className="flex flex-col px-4 pb-7 640:px-6 640:pb-7 1440:px-[74px] 1440:pb-16">
          {/* 獎品清單 */}
          <RewardBlock
            imageUrl={productImageUrl}
            name={productName}
            quantity={productQuantity}
            price={productPrice}
            className="mb-4 md:mb-6"
          />

          {/* 寄送資訊區塊 */}
          <div className="setting-gradient-block-01">
            <div className="setting-block-02">
              <p className="setting-title-02">訂單號碼</p>
              <p className="setting-label-02">{orderId}</p>
            </div>
            <div className="setting-block-02">
              <p className="setting-title-02">領獎帳號</p>
              <p className="setting-label-02">{`${nickname}｜${userId}`}</p>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="setting-gradient-block-01">
            <div className="setting-block-02">
              <p className="setting-title-02">注意事項</p>
              <p className="setting-label-02" dangerouslySetInnerHTML={{ __html: note }} />
            </div>
          </div>

          {/* 提示資訊 */}
          <p className="text-black-1 mob-text-bold-02 mt-3 text-center 1440:mt-7 1440:web-text-bold-01">
            ※ 您可於
            <Link
              href={`${paths.settings.children.redeem.children['virtual-treasure'].children.history.nva.path}`}
              className="text-yile-500 underline underline-offset-4"
            >
              會員中心→虛寶兌換紀錄
            </Link>
            ，確認虛寶兌換資訊。
          </p>
        </div>
      </div>
    </div>
  )
}

export default VirtualTreasureDetail
