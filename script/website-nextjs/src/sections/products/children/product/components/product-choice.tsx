'use client'

import { memo, useMemo } from 'react'
import useProductView from '../hook/use-product-view'
import IconPoint from '@/components/custom/icons/icon-point'
import FormProvider from '@/components/custom/hook-form/form-provider'
import CommonRHFSelect from '@/components/custom/hook-form/common/rhf-select'
import { formatWithCommas } from '@/utils/number'
import { FiPlusCircle } from 'react-icons/fi'
import { WithClassName } from '@/types/common'
import { cn } from '@/lib/utils'
import { ABUNDANT_STOCK, SOLD_OUT_THRESHOLD } from '@/constants/product-type'
import Button3 from '@/components/custom/button/button3'
import ImagePreviewBox from './image-preview-box'

type Props = WithClassName<{
  imageUrls: string[]
  title: string
  stock: number
  countDown: number
  point: number
  description: string
  productId: string
  snapshotId: string
}>

function ProductChoice({
  imageUrls,
  title,
  stock,
  point,
  description,
  productId,
  snapshotId,
  className,
}: Props) {
  const { disabledButton, methods, handleSubmit, onSubmit, quantitySelectOptions } = useProductView(
    productId,
    snapshotId
  )

  const formComponent = useMemo(() => {
    return (
      <>
        <div className="flex flex-row items-center gap-x-2">
          <p className="mob-text-bold-02 1440:web-text-bold-02 text-gray">數量</p>
          <CommonRHFSelect
            name="quantity"
            disabled={disabledButton}
            placeholder="請選擇數量"
            options={quantitySelectOptions}
            className="w-[130px] rounded-[10px] p-2 1440:rounded-2xl 1440:px-3 1440:py-2.5"
          />
        </div>

        <Button3
          type="submit"
          disabled={disabledButton}
          className="py-2 rounded-xl flex-1 640:min-w-[335px] 1440:min-w-auto 1440:py-5 1440:max-w-[327px]"
        >
          <p className="flex flex-row gap-x-2.5 justify-center items-center">
            <FiPlusCircle className="size-5 1440:size-7" />
            <span className="mob-button-small 1440:web-button-small">立即兌換</span>
          </p>
        </Button3>
      </>
    )
  }, [disabledButton, quantitySelectOptions])

  const isAlmostSoldOut = useMemo(() => {
    return stock !== ABUNDANT_STOCK && stock <= SOLD_OUT_THRESHOLD
  }, [stock])

  return (
    <div
      className={cn(
        'flex flex-col px-4 gap-7 items-start 640:flex-row 640:gap-4 1440:px-2.5 1440:gap-9',
        className
      )}
    >
      {/* 圖片 */}
      <ImagePreviewBox title={title} imageUrls={imageUrls} isAlmostSoldOut={isAlmostSoldOut} />

      {/* 商品資訊 */}
      <div className="w-full flex flex-col 640:flex-1">
        <div className="flex flex-col gap-2 mb-2 1440:flex-row 1440:gap-3">
          <div className="inline-block self-start mob-text-small bg-green-2 rounded-full px-4 py-1.5 text-white 1440:text-text">
            {stock === ABUNDANT_STOCK ? '庫存充足' : `剩餘${stock}個`}
          </div>
        </div>

        <h1 className="mob-h3-bold text-black-1 1440:web-h1 mb-2">{title}</h1>

        <div className="flex flex-row items-center gap-x-1.5 mb-1.5">
          <IconPoint className="w-8 1440:w-8" />
          <p className="mob-em-small 1440:web-em-bold text-yile-700">{`${formatWithCommas(
            point
          )}點`}</p>
        </div>

        <p className="w-full h-[1px] bg-yile-300 mb-2.5" />

        <div className="1440:mb-12">
          <p className="text-yile-950 mob-text break-all 1440:web-text">{description}</p>
        </div>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden w-full flex-col gap-y-4 1440:flex 1440:gap-y-12">
            {formComponent}
          </div>

          <div className="flex items-center w-full fixed bottom-0 left-0 z-20 bg-white h-[var(--fix-panel-height)] border-t border-gray-200 px-5 1440:hidden">
            <div className="w-full flex flex-row gap-4 max-w-[600px] mx-auto">{formComponent}</div>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default memo(ProductChoice)
