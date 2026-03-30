'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils'
import useRegions from '@/hooks/use-regions'
import { Label } from '@/components/ui/label'
import RHFRadioButton from '@/components/custom/hook-form/rhf-radio-button'
import RHFTitle from '@/components/custom/hook-form/rhf-title'
import CommonRHFSelect from '@/components/custom/hook-form/common/rhf-select'
import CommonRHFTextField from '@/components/custom/hook-form/common/rhf-textfield'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'
import { DELIVERY_METHOD } from '@/constants/delivery-method'
import NoteBlock from '../../note-block'
import RewardBlock from '../../reward-block'
import DeliveryGuide from '../../delivery-guide'
import Button2 from '@/components/custom/button/button2'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  imageUrl: string
  name: string
  quantity: number
  price: number
  city: string
  notes: string
  disabled?: boolean
  handleShippingAutoFillCustomMemberInfoChange: () => void
  handleRecipientCityChange: (city: string) => void
  handleRecipientDistrictChange: (district: string) => void
  onAutoFillMemberInfo?: () => void
}>

function ShippingInfo({
  imageUrl = '',
  name = '未命名',
  quantity = 0,
  price = 0,
  className,
  city,
  notes,
  disabled = false,
  handleShippingAutoFillCustomMemberInfoChange,
  handleRecipientCityChange,
  handleRecipientDistrictChange,
}: Props) {
  const { counties, districts } = useRegions({ customCity: city })

  return (
    <div className={className}>
      <div className="setting-panel-wrap">
        <div className="setting-panel-frame">
          <CategoryTitleBox>
            <CategoryTitle title="實體好禮" />
          </CategoryTitleBox>

          <div className="flex flex-col px-4 pb-4 640:px-6 640:pb-6 1440:px-[74px] 1440:pb-16">
            {/* 獎品清單表格 */}
            <RewardBlock
              imageUrl={imageUrl}
              name={name}
              quantity={quantity}
              price={price}
              className="mb-6"
            />

            {/* 寄送說明 */}
            <DeliveryGuide className="mb-4 640:mb-4">
              <p className="text-yile-500 mob-button-small mb-1.5 640:mb-2 1440:web-button-small 1440:mb-4">
                禮品將以實體形式，寄送至您填寫的地址：
              </p>

              {/* 寄送方式選擇 */}
              <div className="flex gap-3 flex-col items-start 640:gap-2">
                {Object.values(DELIVERY_METHOD).map((deliveryMethod) => {
                  const isDisabled = !deliveryMethod.Enabled

                  if (isDisabled) {
                    return null
                  }

                  return (
                    <div
                      className={cn(
                        'flex flex-row items-center gap-x-2',
                        isDisabled && 'opacity-50 cursor-not-allowed'
                      )}
                      key={deliveryMethod.Key}
                    >
                      <RHFRadioButton
                        disabled={isDisabled}
                        id={deliveryMethod.Key}
                        name="deliveryMethod"
                        value={deliveryMethod.Key}
                        className="w-4 border-gray-700 before:bg-green-2 1440:w-5"
                      />
                      <Label
                        htmlFor={deliveryMethod.Key}
                        className={cn(
                          'cursor-pointer mob-text-bold-02 1440:web-text-bold-01',
                          isDisabled && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        {deliveryMethod.Name}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </DeliveryGuide>

            {/* 表單欄位群組 */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col-reverse gap-2.5 1440:flex-row">
                <div className="flex flex-col gap-1 640:flex-1">
                  <RHFTitle
                    htmlFor="recipientName"
                    string="收件人姓名"
                    required
                    className="mob-text 1440:text-text"
                  />
                  <CommonRHFTextField
                    disabled={disabled}
                    name="recipientName"
                    placeholder="請輸入收件人姓名"
                  />
                </div>

                <div className="w-full 1440:w-auto 1440:flex-1 1440:flex 1440:flex-col 1440:justify-end">
                  <Button2
                    id="auto-fill-shipping-member-info"
                    label="自動帶入兌換人資料"
                    isActive={!disabled}
                    className={cn(
                      'whitespace-nowrap mob-button-small px-4 py-2 1440:px-12 1440:py-2.5',
                      disabled && 'cursor-not-allowed'
                    )}
                    handleOnClick={handleShippingAutoFillCustomMemberInfoChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 640:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <RHFTitle
                    htmlFor="recipientPhone"
                    string="收件人市話"
                    className="mob-text 1440:text-text"
                  />
                  <CommonRHFTextField
                    disabled={disabled}
                    name="recipientCityPhone"
                    placeholder="請輸入市話"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <RHFTitle
                    htmlFor="recipientPhone"
                    string="收件人手機"
                    required
                    className="mob-text 1440:text-text"
                  />
                  <CommonRHFTextField
                    disabled={disabled}
                    name="recipientPhone"
                    placeholder="請輸入收件人手機號碼"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <RHFTitle
                  htmlFor="recipientAddress"
                  string="寄送地址"
                  required
                  className="mob-text 1440:text-text"
                />

                <div className="grid grid-cols-1 gap-2.5">
                  <div className="grid grid-cols-1 gap-2.5 640:grid-cols-2">
                    <CommonRHFSelect
                      disabled={disabled}
                      name="recipientCity"
                      placeholder="請選擇縣市"
                      options={counties}
                      className="w-full"
                      onValueChange={handleRecipientCityChange}
                    />
                    <CommonRHFSelect
                      disabled={disabled}
                      name="recipientDistrict"
                      placeholder="請選擇地區"
                      options={districts}
                      className="w-full"
                      onValueChange={handleRecipientDistrictChange}
                    />
                  </div>
                  <CommonRHFTextField
                    disabled={disabled}
                    name="recipientAddress"
                    placeholder="請輸入詳細地址"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <NoteBlock notes={notes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ShippingInfo)
