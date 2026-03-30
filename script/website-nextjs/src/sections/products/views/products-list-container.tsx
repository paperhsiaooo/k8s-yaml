import { GetProductTagsResType } from '@/apis/server/public/products/getProductTags'
import ProductCategoryBlock from '../components/product-category-block'

interface ProductsListContainerProps {
  tags: GetProductTagsResType
}

function ProductsListContainer({ tags }: ProductsListContainerProps) {
  return (
    <div className="flex flex-col gap-y-2">
      {tags.map((tag) => (
        <ProductCategoryBlock key={tag.id} id={tag.id} title={tag.name} />
      ))}
    </div>
  )
}

export default ProductsListContainer
