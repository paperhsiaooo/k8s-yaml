'use client'

import { PiArrowCircleRightBold } from 'react-icons/pi'
import useProduct from '../hook/use-product'
import Button1 from '@/components/custom/button/button1'

function ProductMoreButton() {
  const { handleMoreProductsClick } = useProduct()

  return (
    <Button1
      onClick={handleMoreProductsClick}
      type="button"
      className={`
          max-w-xs
          mx-auto
          px-6
          py-3
          gap-x-4
          border-4
          1440:px-8
          1440:py-4`}
    >
      <p className="text-yile-950 web-text-bold-01 1440:web-button-bold">更多禮品</p>
      <PiArrowCircleRightBold className="text-yile-950 text-2xl 1440:text-4xl" />
    </Button1>
  )
}

export default ProductMoreButton
