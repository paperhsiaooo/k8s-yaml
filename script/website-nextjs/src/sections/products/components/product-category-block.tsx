import { getProductList } from '@/apis/server/public/products/getProductList'
import { Product } from '@/components/custom/product/product-card'
import { ABUNDANT_STOCK, SOLD_OUT_THRESHOLD } from '@/constants/product-type'
import { TAGS } from '@/constants/tags'
import ErrorPageRoot from '@/errorPage/errorPageRoot'
import { paths } from '@/routes/path'
import { ServerApiFetchError } from '@/utils/server-api-fetch'

interface ProductCategoryBlockProps {
  id: string
  title: string
}

function ProductCategoryBG({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <div id={id} className="product-category-block-bg">
      <div className="relative z-10">{children}</div>
    </div>
  )
}

async function ProductCategoryBlock({ id, title }: ProductCategoryBlockProps) {
  try {
    let products = await getProductList({ tag: id, limit: 20 })

    if (products.length === 0) {
      return null
    }

    // 由金額高到低，除了推薦商品
    if (id !== TAGS.recommend.code) {
      products = products.sort((a, b) => b.price - a.price)
    }

    return (
      <ProductCategoryBG id={id}>
        <div className="product-category-block-wrapper">
          <h2 className="mob-button-bold 1440:web-button-bold text-black-1 text-center">{title}</h2>
          {products.length !== 0 && (
            <div className="grid grid-cols-2 gap-3 640:grid-cols-3 640:gap-5 1440:grid-cols-4 1440:gap-5">
              {products.map((product) => (
                <Product.Container
                  key={product.productId}
                  link={`${paths.products.root}/${product.productId}`}
                  isDisabled={product.stock === 0}
                  className="1440:w-full"
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
              ))}
            </div>
          )}
        </div>
      </ProductCategoryBG>
    )
  } catch (error) {
    const { httpStatus } = error as ServerApiFetchError
    console.error('[PageError] ProductCategoryBlock / httpStatus: ', httpStatus)

    return <ErrorPageRoot httpStatus={httpStatus} />
  }
}

export default ProductCategoryBlock
