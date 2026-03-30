import { useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import {
  GET_PHYSICAL_DETAIL_RES_DEFAULT,
  GetPhysicalDetailParamsType,
  GetPhysicalDetailResSchema,
  GetPhysicalDetailResType,
  PhysicalPrefix,
} from './type'
import { OrdersPrefix } from '../type'

async function getDetailAPI(
  params: GetPhysicalDetailParamsType
): Promise<GetPhysicalDetailResType> {
  try {
    const url = `/private/v1/${OrdersPrefix}/${PhysicalPrefix}/${params.orderId}`
    const res = await axios.get(url)

    return GetPhysicalDetailResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetDetailAPI(params: GetPhysicalDetailParamsType) {
  return useQuery({
    queryKey: [`${OrdersPrefix}/${PhysicalPrefix}/${params.orderId}`],
    queryFn: () => getDetailAPI(params),
    enabled: !!params,
    initialData: GET_PHYSICAL_DETAIL_RES_DEFAULT,
  })
}

export default useGetDetailAPI
