import { useQuery } from '@tanstack/react-query'

import {
  GET_VIRTUAL_TREASURE_HISTORY_RES_DEFAULT,
  GetVirtualTreasureHistoryResSchema,
  GetVirtualTreasureHistoryResType,
  VirtualTreasurePrefix,
} from './type'
import { OrdersPrefix } from '../type'
import axios from '@/utils/axios'

async function getHistoryAPI(): Promise<GetVirtualTreasureHistoryResType> {
  try {
    const url = `/private/v1/${OrdersPrefix}/${VirtualTreasurePrefix}/history`
    const res = await axios.get(url)
    return GetVirtualTreasureHistoryResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetHistoryAPI() {
  return useQuery({
    queryKey: [`${OrdersPrefix}/${VirtualTreasurePrefix}/history`],
    queryFn: () => getHistoryAPI(),
    initialData: GET_VIRTUAL_TREASURE_HISTORY_RES_DEFAULT,
  })
}

export default useGetHistoryAPI
