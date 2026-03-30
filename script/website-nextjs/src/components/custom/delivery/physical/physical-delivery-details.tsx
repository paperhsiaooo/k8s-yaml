import { addDays, formatISO9075 } from 'date-fns'
import RewardBlock from '@/sections/products/children/product/children/checkout/components/reward-block'
import Link from 'next/link'
import { paths } from '@/routes/path'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'
import { getDeliveryMethodName } from '@/utils/delivery-method'
import { getCountyNameById, getDistrictNameById } from '@/utils/regions'

interface PhysicalDeliveryDetailsProps {
  orderId: string
  deliveryMethod: string
  createTime: number
  recipientName: string
  recipientPhone: string
  recipientCityPhone: string
  recipientCountyId: number
  recipientDistrictId: number
  recipientAddress: string
  productName: string
  productImageUrl: string
  productPrice: number
  productQuantity: number
  note: string
}

function PhysicalDeliveryDetails({
  orderId = '',
  deliveryMethod = '',
  createTime = 0,
  recipientName = '',
  recipientPhone = '',
  recipientCityPhone = '',
  recipientCountyId = 0,
  recipientDistrictId = 0,
  recipientAddress = '',
  productName = '',
  productImageUrl = '',
  productPrice = 0,
  productQuantity = 0,
  note = '',
}: PhysicalDeliveryDetailsProps) {
  return (
    <div className="setting-panel-wrap">
      <div className="setting-panel-frame">
        <CategoryTitleBox>
          <CategoryTitle title="實體好禮" />
        </CategoryTitleBox>

        <div className="flex flex-col px-4 pb-4 640:px-6 640:pb-6 1440:px-[74px] 1440:pb-16">
          {/* 獎品清單 */}
          <RewardBlock
            imageUrl={productImageUrl}
            name={productName}
            quantity={productQuantity}
            price={productPrice}
            className="mb-4 640:mb-6 1440:mb-[30px]"
          />

          {/* 寄送資訊區塊 */}
          <div className="setting-gradient-block-01">
            <div className="setting-block-02">
              <p className="setting-title-02">訂單號碼</p>
              <p className="setting-label-02">{orderId}</p>
            </div>
            <div className="setting-block-02">
              <p className="setting-title-02">運送方式</p>
              <p className="setting-label-02">{getDeliveryMethodName(deliveryMethod)}</p>
            </div>
            <div className="setting-block-02">
              <p className="setting-title-02">收件人姓名</p>
              <p className="setting-label-02">{recipientName}</p>
            </div>
            <div className="setting-block-02">
              <p className="setting-title-02">收件人手機</p>
              <p className="setting-label-02">{recipientPhone}</p>
            </div>
            <div className="setting-block-02">
              <p className="setting-title-02">收件人市話</p>
              <p className="setting-label-02">{recipientCityPhone}</p>
            </div>
            <div className="setting-block-02">
              <p className="setting-title-02">寄件地址</p>
              <p className="setting-label-02">{`${getCountyNameById(
                recipientCountyId
              )}${getDistrictNameById(recipientDistrictId)}${recipientAddress}`}</p>
            </div>
            <div className="setting-block-02">
              <p className="setting-title-02">預計出貨時間</p>
              <p className="setting-label-02">{formatISO9075(addDays(new Date(createTime), 30))}</p>
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
          <p className="mob-text-bold-02 text-center">
            ※ 您可於
            <Link
              href={`${paths.settings.children['shipment-tracking'].nav.path}?status=pending`}
              className="text-yile-500"
            >
              會員中心→實體好禮出貨查詢
            </Link>
            ，確認訂單資訊。
          </p>
        </div>
      </div>
    </div>
  )
}

export default PhysicalDeliveryDetails
