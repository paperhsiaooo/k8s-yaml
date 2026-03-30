'use client'

import { PRODUCT_TYPE } from '@/constants/product-type'
import PhysicalCheckoutView from '@/sections/products/children/product/children/checkout/components/physical/physical-checkout-view'
import { useMemo } from 'react'
import VirtualTreasureCheckoutView from '../components/virtualTreasure/virtual-treasure-checkout-view'

type Props = {
  productId: string
  redeemHash: string
  type: string
  imageUrl: string
  name: string
  quantity: number
  price: number
  notes: string
  appCode: string
}

function CheckoutView({
  type,
  redeemHash,
  productId,
  imageUrl,
  name,
  quantity,
  price,
  notes,
  appCode,
}: Props) {
  const renderCheckoutView = useMemo(() => {
    if (type === PRODUCT_TYPE.Physical) {
      return (
        <PhysicalCheckoutView
          productId={productId}
          redeemHash={redeemHash}
          imageUrl={imageUrl}
          name={name}
          quantity={quantity}
          price={price}
          notes={notes}
        />
      )
    } else if (type === PRODUCT_TYPE.VirtualTreasure) {
      return (
        <VirtualTreasureCheckoutView
          productId={productId}
          redeemHash={redeemHash}
          imageUrl={imageUrl}
          name={name}
          quantity={quantity}
          price={price}
          notes={notes}
          appCode={appCode}
        />
      )
    } else {
      return <div>{`the ${type} of product is not supported`}</div>
    }
  }, [type, productId, redeemHash, imageUrl, name, quantity, price, notes, appCode])

  return (
    <main className="bg-yile-100 footer-padding">
      <div className="pb-6 px-4 max-w-375 mx-auto flex flex-col gap-y-10 640:max-w-640 1440:max-w-1440 1920:max-w-1920">
        {renderCheckoutView}
      </div>
    </main>
  )
}

export default CheckoutView
