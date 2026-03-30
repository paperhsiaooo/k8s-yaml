import { Suspense } from 'react'
import { ProductCardList, ProductCardListSkeleton } from '../components/product-card-list'
import Image from 'next/image'
import ProductMoreButton from '../components/product-more-button'
import { WithClassName } from '@/types/common'
import { cn } from '@/lib/utils'

type Props = WithClassName

async function ProductsView({ className }: Props) {
  return (
    <div className={cn('relative w-full bg-yile-100 footer-padding', className)}>
      <div className="wrapper">
        <div className="flex flex-col justify-center pt-3 640:pt-4 1440:pt-16">
          <div className="mb-4 1440:mb-9">
            <h2 className="relative aspect-[1178/344] w-[220px] mb-2.5 mx-auto 1440:w-[589px] 1440:mb-3">
              <Image
                src="/images/recommend-text-01.webp"
                alt="product-title"
                width={1178}
                height={344}
              />
            </h2>
            <p className="text-black-1 text-center mob-gift-h1-bold 1440:web-button-bold">
              精選熱門商品，用包鑽點輕鬆兌換心儀好禮
            </p>
          </div>
          <Suspense fallback={<ProductCardListSkeleton />}>
            <ProductCardList />
          </Suspense>
          <ProductMoreButton />
        </div>
      </div>
    </div>
  )
}

export default ProductsView
