'use client'

import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Button1 from '@/components/custom/button/button1'
import ProductChoice from '../components/product-choice'
import ProductInformation from '../components/product-information'
import { PiArrowCircleLeftBold } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import { ProductSchema } from '@/components/structured-data'
import { ABUNDANT_STOCK } from '@/constants/product-type'

function ProductViewSkeleton() {
  return (
    <div className="bg-yile-100">
      <div className="py-10 px-6 max-w-[924px] mx-auto flex flex-col gap-y-10">
        <div className="p-10 bg-white rounded-3xl flex flex-row items-start gap-x-5 shadow-md">
          <Skeleton className="flex-1 aspect-[2/1] rounded-2xl" />
          <div className="flex-1 flex flex-col gap-y-3">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-24 rounded-2xl" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  title: string
  description: string
  imageUrls: string[]
  point: number
  stock: number
  countDown: number
  introductions?: string
  notes?: string
  productId: string
  snapshotId: string
}

function ProductView({
  title,
  description,
  imageUrls,
  point,
  stock,
  countDown,
  introductions,
  notes,
  productId,
  snapshotId,
}: Props) {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      {/* 商品結構化資料 */}
      <ProductSchema
        name={title}
        description={description}
        image={imageUrls}
        price={point}
        currency="TWD"
        availability={stock === ABUNDANT_STOCK || stock > 0 ? 'InStock' : 'OutOfStock'}
        brand="Pointory"
      />

      <Suspense fallback={<ProductViewSkeleton />}>
        <div className="bg-yile-100 w-full flex flex-1 flex-col shrink-0 footer-padding">
          <div
            className={`w-full px-4 max-w-375 mx-auto 640:px-5 640:max-w-640 1440:p-10 1440:max-w-1440`}
          >
            <div className="pb-4 flex flex-col gap-y-5 640:gap-y-5 1440:gap-y-9 1440:pb-7">
              <ProductChoice
                imageUrls={imageUrls}
                title={title}
                stock={stock}
                countDown={countDown}
                point={point}
                description={description}
                productId={productId}
                snapshotId={snapshotId}
              />

              <ProductInformation introductions={introductions} notes={notes} />

              <Button1
                onClick={() => {
                  router.push('/products')
                }}
                type="button"
                className={`max-w-xs mx-auto px-6 py-3 gap-x-4 border-4 1440:px-8 1440:py-5`}
              >
                <PiArrowCircleLeftBold className="text-2xl text-yile-950 1440:text-4xl" />
                <p className="text-yile-950 mob-button-small 1440:web-button-bold">回上一頁</p>
              </Button1>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export default ProductView
