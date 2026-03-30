'use client'

import { useRouter } from 'next/navigation'
import useGetDetailAPI from '@/apis/client/orders/use-get-detail'
import { usePointBalance } from '@/hooks/use-point-balance'
import { useCallback, useEffect } from 'react'
import { PRODUCT_TYPE } from '@/constants/product-type'
import { paths } from '@/routes/path'

type Props = {
  orderId: string
}

function useCompleteView({ orderId }: Props) {
  const router = useRouter()
  const { refreshPoint } = usePointBalance()
  const { data: orderDetail, isLoading } = useGetDetailAPI(orderId)

  const handlerViewDetailButtonClick = useCallback(() => {
    switch (orderDetail.type) {
      case PRODUCT_TYPE.Physical:
        router.push(paths.settings.children['shipment-tracking'].nav.path)
        break
      case PRODUCT_TYPE.VirtualTreasure:
        router.push(
          paths.settings.children.redeem.children['virtual-treasure'].children.history.nva.path
        )
        break
    }
  }, [orderDetail.type, router])

  useEffect(() => {
    refreshPoint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    type: orderDetail?.type,
    physicalData: orderDetail?.physicalData || {
      product: {
        name: '',
        price: 0,
        quantity: 0,
        imageUrl: '',
        description: '',
      },
      deliveryType: '',
      recipientName: '',
      recipientPhone: '',
      recipientCityPhone: '',
      recipientCountyId: 0,
      recipientDistrictId: 0,
      recipientDetailAddress: '',
      note: '',
      createTime: 0,
    },
    virtualData: orderDetail?.virtualData || {},
    virtualTreasureData: orderDetail?.virtualTreasureData || {
      product: {
        name: '',
        price: 0,
        quantity: 0,
        imageUrl: '',
        description: '',
      },
      nickName: '',
      userId: '',
      note: '',
    },
    isLoading,
    handlerViewDetailButtonClick,
  }
}

export default useCompleteView
