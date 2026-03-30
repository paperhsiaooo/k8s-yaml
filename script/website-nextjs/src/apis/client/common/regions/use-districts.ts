import { keepPreviousData, useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import { CommonPrefix } from '../type'
import { RegionsDistrictsResSchema, RegionsDistrictsResType, RegionsPrefix } from './type'

async function getDistrictsAPI(countyId: string): Promise<RegionsDistrictsResType> {
  try {
    const res = await axios.get(`/public/v1/${CommonPrefix}/${RegionsPrefix}/${countyId}/districts`)
    return RegionsDistrictsResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetDistrictsAPI(countyId: string) {
  const { data, isLoading, error } = useQuery<RegionsDistrictsResType>({
    queryKey: [`${CommonPrefix}/${RegionsPrefix}/${countyId}/districts`],
    queryFn: () => getDistrictsAPI(countyId),
    enabled: !!countyId,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60 * 24,
  })

  return {
    districts:
      data?.map((item) => ({
        value: `${item.id}`,
        label: item.name,
      })) || [],
    isLoading,
    error,
  }
}

export default useGetDistrictsAPI
