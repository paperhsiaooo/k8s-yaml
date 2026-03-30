import { Suspense } from 'react'
import ProductsContainer from './products-container'
import Loading from '@/components/custom/loading'

function ProductsView() {
  return (
    <section className="bg-yile-100 flex-1 footer-padding">
      <div className={`wrapper space-y-5 1440:max-w-[1542px]`}>
        <div>
          <h1 className="sr-only">商品列表</h1>
          <Suspense fallback={<Loading />}>
            <ProductsContainer />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default ProductsView
