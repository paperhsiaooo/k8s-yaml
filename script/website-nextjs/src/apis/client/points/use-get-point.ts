import { useQuery } from '@tanstack/react-query'
import axios from '@/utils/axios'
import {
  GET_POINTS_RES_DEFAULT,
  GetPointsParamsType,
  GetPointsResSchema,
  GetPointsResType,
  PointsPrefix,
} from './type'

async function getPointAPI(params: GetPointsParamsType): Promise<GetPointsResType> {
  try {
    const res = await axios.get(`/private/v1/${PointsPrefix}/${params.memberId}`)
    return GetPointsResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetPointAPI(params: GetPointsParamsType) {
  return useQuery({
    queryKey: [`${PointsPrefix}/point`, params],
    queryFn: () => getPointAPI(params),
    enabled: !!params.memberId,
    initialData: GET_POINTS_RES_DEFAULT,
  })
}

export default useGetPointAPI
