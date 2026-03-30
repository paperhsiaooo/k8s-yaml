import { useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import {
  GET_ORDER_DETAIL_RES_DEFAULT,
  GetOrderDetailResSchema,
  GetOrderDetailResType,
  OrdersPrefix,
} from './type'

async function getDetailAPI(orderId: string): Promise<GetOrderDetailResType> {
  try {
    const url = `/private/v1/${OrdersPrefix}/${orderId}`
    const res = await axios.get(url)

    return GetOrderDetailResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetDetailAPI(orderId: string) {
  return useQuery({
    queryKey: [`${OrdersPrefix}/${orderId}`],
    queryFn: () => getDetailAPI(orderId),
    enabled: !!orderId && orderId !== '',
    initialData: GET_ORDER_DETAIL_RES_DEFAULT,
  })
}

export default useGetDetailAPI
