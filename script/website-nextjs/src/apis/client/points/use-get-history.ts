import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import axios from '@/utils/axios'
import {
  GET_POINTS_HISTORY_RES_DEFAULT,
  GetPointsHistoryParamsType,
  GetPointsHistoryResSchema,
  GetPointsHistoryResType,
  PointsPrefix,
} from './type'

const GetPointsHistoryResArraySchema = z.array(GetPointsHistoryResSchema)

async function getHistoryAPI(params: GetPointsHistoryParamsType): Promise<GetPointsHistoryResType> {
  const queryString = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  ).toString()
  try {
    const res = await axios.get(`/private/v1/${PointsPrefix}/history?${queryString}`)
    const parsed = GetPointsHistoryResSchema.safeParse(res)

    if (parsed.success) return parsed.data

    const legacyParsed = GetPointsHistoryResArraySchema.safeParse(res)

    if (legacyParsed.success) {
      const [firstPage] = legacyParsed.data
      return firstPage ?? GET_POINTS_HISTORY_RES_DEFAULT
    }

    throw parsed.error ?? legacyParsed.error
  } catch (error) {
    throw error
  }
}

function useGetHistoryAPI(params: GetPointsHistoryParamsType) {
  return useQuery({
    queryKey: [`${PointsPrefix}/history`, params],
    queryFn: () => getHistoryAPI(params),
    enabled: !!params,
    initialData: GET_POINTS_HISTORY_RES_DEFAULT,
  })
}

export default useGetHistoryAPI
