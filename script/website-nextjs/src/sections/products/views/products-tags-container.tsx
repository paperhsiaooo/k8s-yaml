import { memo } from 'react'
import { GetProductTagsResType } from '@/apis/server/public/products/getProductTags'
import ProductTags from '../components/product-tags'
import { TAGS } from '@/constants/tags'
import { WithClassName } from '@/types/common'
import { PRODUCT_TYPE } from '@/constants/product-type'

type ProductsTagsContainerProps = WithClassName<{
  tags: GetProductTagsResType
}>

function ProductsTagsContainer({ tags, className }: ProductsTagsContainerProps) {
  const orderedTags = tags
    .sort((a, b) => TAGS[a.id as keyof typeof TAGS].order - TAGS[b.id as keyof typeof TAGS].order)
    .filter((tag) => tag.id !== PRODUCT_TYPE.Virtual)

  console.log('orderedTags: ', orderedTags)

  return (
    <div className={className}>
      <ProductTags tags={orderedTags} />
    </div>
  )
}

export default memo(ProductsTagsContainer)
