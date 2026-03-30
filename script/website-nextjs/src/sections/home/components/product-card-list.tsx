export const dynamic = 'force-dynamic'

import { getProductList } from '@/apis/server/public/products/getProductList'
import { Product } from '../../../components/custom/product/product-card'
import { paths } from '@/routes/path'
import { ABUNDANT_STOCK, SOLD_OUT_THRESHOLD } from '@/constants/product-type'
import { ServerApiFetchError } from '@/utils/server-api-fetch'
import { TAGS } from '@/constants/tags'
import ErrorPageRoot from '@/errorPage/errorPageRoot'

async function ProductCardList() {
  try {
    const products = await getProductList({ tag: TAGS.recommend.code, limit: 20 })

    return (
      <div
        className="w-full
        max-w-375
        mx-auto
        grid
        grid-cols-2
        gap-3
        mb-2.5
        640:max-w-640
        640:grid-cols-3
        640:gap-4
        640:mb-6
        1440:max-w-[1360px]
        1440:grid-cols-4
        1440:gap-7
      "
      >
        {products.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-2xl font-bold">目前沒有產品</p>
          </div>
        ) : (
          products.map((product) => {
            return (
              <Product.Container
                key={product.productId}
                link={`${paths.products.root}/${product.productId}`}
                isDisabled={product.stock === 0}
                className="w-full"
              >
                <Product.Content
                  name={product.name}
                  imageUrl={product.imageUrl}
                  point={product.price}
                  stock={product.stock}
                  isDisabled={product.stock === 0}
                  isAlmostSoldOut={product.stock !== ABUNDANT_STOCK && product.stock <= SOLD_OUT_THRESHOLD}
                />
              </Product.Container>
            )
          })
        )}
      </div>
    )
  } catch (error) {
    const { httpStatus } = error as ServerApiFetchError
    console.error('[PageError] ProductCardList / httpStatus: ', httpStatus)

    return <ErrorPageRoot httpStatus={httpStatus} />
  }
}

// 載入狀態組件
function ProductCardListSkeleton() {
  return (
    <div className="flex flex-row gap-x-4 flex-wrap w-full max-w-[950px] mx-auto">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-[300px] h-[400px] bg-orange-200 rounded-3xl animate-pulse" />
      ))}
    </div>
  )
}

export { ProductCardList, ProductCardListSkeleton }
