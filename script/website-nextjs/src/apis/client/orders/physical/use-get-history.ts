import { useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import {
  GET_PHYSICAL_HISTORY_RES_DEFAULT,
  GetPhysicalHistoryParamsType,
  GetPhysicalHistoryResSchema,
  GetPhysicalHistoryResType,
  PhysicalPrefix,
} from './type'
import { OrdersPrefix } from '../type'

async function getHistoryAPI(
  params: GetPhysicalHistoryParamsType
): Promise<GetPhysicalHistoryResType> {
  const queryString = new URLSearchParams(params).toString()
  try {
    const url = `/private/v1/${OrdersPrefix}/${PhysicalPrefix}/history?${queryString}`
    const res = await axios.get(url)
    return GetPhysicalHistoryResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetHistoryAPI(params: GetPhysicalHistoryParamsType) {
  return useQuery({
    queryKey: [`${OrdersPrefix}/${PhysicalPrefix}/history`, params.status],
    queryFn: () => getHistoryAPI(params),
    enabled: !!params,
    initialData: GET_PHYSICAL_HISTORY_RES_DEFAULT,
  })
}

export default useGetHistoryAPI
