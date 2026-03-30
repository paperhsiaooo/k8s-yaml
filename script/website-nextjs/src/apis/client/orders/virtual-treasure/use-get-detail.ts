import { useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import {
  GET_VIRTUAL_TREASURE_DETAIL_RES_DEFAULT,
  GetVirtualTreasureDetailResSchema,
  GetVirtualTreasureDetailResType,
  VirtualTreasurePrefix,
} from './type'
import { OrdersPrefix } from '../type'

async function getDetailAPI(orderId: string): Promise<GetVirtualTreasureDetailResType> {
  try {
    const url = `/private/v1/${OrdersPrefix}/${VirtualTreasurePrefix}/${orderId}`
    const res = await axios.get(url)

    return GetVirtualTreasureDetailResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetDetailAPI(orderId: string) {
  return useQuery({
    queryKey: [`${OrdersPrefix}/${VirtualTreasurePrefix}/${orderId}`],
    queryFn: () => getDetailAPI(orderId),
    enabled: !!orderId && orderId !== '',
    initialData: GET_VIRTUAL_TREASURE_DETAIL_RES_DEFAULT,
  })
}

export default useGetDetailAPI
