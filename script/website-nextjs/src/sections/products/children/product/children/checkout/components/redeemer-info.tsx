'use client'

import { memo } from 'react'
import useRegions from '@/hooks/use-regions'
import RHFTitle from '@/components/custom/hook-form/rhf-title'
import CommonRHFSelect from '@/components/custom/hook-form/common/rhf-select'
import CommonRHFTextField from '@/components/custom/hook-form/common/rhf-textfield'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  disabled?: boolean
  customCity: string
  handleCustomCityChange: (city: string) => void
  handleCustomDistrictChange: (district: string) => void
}>

function RedeemerInfo({
  className,
  disabled = false,
  customCity,
  handleCustomCityChange,
  handleCustomDistrictChange,
}: Props) {
  const { counties, districts } = useRegions({ customCity })

  return (
    <div className={className}>
      <div className="setting-panel-wrap">
        <div className="setting-panel-frame">
          <CategoryTitleBox className="mb-0 640:mb-0 1440:mb-9">
            <CategoryTitle title="兌換人資料" className="flex" />
          </CategoryTitleBox>

          <div className="flex flex-col px-4 pb-4 640:px-6 640:pb-6 1440:px-[74px] 1440:pb-16">
            <div className="grid grid-cols-1 gap-4">
              {/* Auto Fill Member Info */}
              <div className="flex flex-col justify-center gap-1">
                <div className="pb-2.5 border-b-[2px] border-yile-200 1440:border-b-0 1440:pb-0">
                  <p className="mob-text-bold-02 text-red-1 1440:web-text-bold-01">
                    ＊您修改的內容，將於送出後更新至會員資料。
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 640:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <RHFTitle
                    htmlFor="customName"
                    string="兌換人姓名"
                    required
                    className="mob-text 1440:web-text"
                  />
                  <CommonRHFTextField
                    disabled={disabled}
                    name="customName"
                    placeholder="請輸入您的真實姓名"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <RHFTitle
                    htmlFor="customPhone"
                    string="手機號碼"
                    required
                    className="mob-text 1440:text-text"
                  />
                  <CommonRHFTextField disabled name="customPhone" placeholder="請輸入手機號碼" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 640:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <RHFTitle
                    htmlFor="customEmail"
                    string="電子郵件"
                    required
                    className="mob-text 1440:text-text"
                  />
                  <CommonRHFTextField
                    disabled={disabled}
                    name="customEmail"
                    placeholder="請輸入電子郵件"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <RHFTitle
                    htmlFor="customCityPhone"
                    string="市話"
                    className="mob-text 1440:text-text"
                  />
                  <CommonRHFTextField
                    disabled={disabled}
                    name="customCityPhone"
                    placeholder="請輸入市話"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <RHFTitle
                  htmlFor="customAddress"
                  string="聯絡地址"
                  required
                  className="mob-text 1440:text-text"
                />
                <div className="grid grid-cols-1 gap-2.5">
                  <div className="grid grid-cols-1 gap-2.5 640:grid-cols-2">
                    <CommonRHFSelect
                      disabled={disabled}
                      name="customCity"
                      placeholder="請選擇縣市"
                      options={counties}
                      className="w-full"
                      onValueChange={handleCustomCityChange}
                    />
                    <CommonRHFSelect
                      disabled={disabled}
                      name="customDistrict"
                      placeholder="請選擇地區"
                      options={districts}
                      className="w-full"
                      onValueChange={handleCustomDistrictChange}
                    />
                  </div>
                  <CommonRHFTextField
                    disabled={disabled}
                    name="customAddress"
                    placeholder="請輸入詳細地址"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(RedeemerInfo)
