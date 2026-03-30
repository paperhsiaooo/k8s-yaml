import { getProductTags } from '@/apis/server/public/products/getProductTags'
import ProductsTagsContainer from './products-tags-container'
import ProductsListContainer from './products-list-container'
import { ServerApiFetchError } from '@/utils/server-api-fetch'
import ErrorPageRoot from '@/errorPage/errorPageRoot'

async function ProductsContainer() {
  try {
    const tags = await getProductTags()

    return (
      <>
        <ProductsTagsContainer tags={tags} className="mb-2" />
        <ProductsListContainer tags={tags} />
      </>
    )
  } catch (error) {
    const { httpStatus } = error as ServerApiFetchError
    console.error('[PageError] ProductsContainer / httpStatus: ', httpStatus)

    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <ErrorPageRoot httpStatus={httpStatus} />
        </div>
      </div>
    )
  }
}

export default ProductsContainer
