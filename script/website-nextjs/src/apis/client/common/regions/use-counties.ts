import { useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import { CommonPrefix } from '../type'
import { RegionsCountiesResSchema, RegionsCountiesResType, RegionsPrefix } from './type'

const cacheKey = `${CommonPrefix}/${RegionsPrefix}/counties`

async function getCountiesAPI(): Promise<RegionsCountiesResType> {
  try {
    const res = await axios.get(`/public/v1/${CommonPrefix}/${RegionsPrefix}/counties`)
    return RegionsCountiesResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetCountiesAPI() {
  const { data, isLoading, error } = useQuery<RegionsCountiesResType>({
    queryKey: [cacheKey],
    queryFn: () => getCountiesAPI(),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
  })

  return {
    counties:
      data?.map((item) => ({
        value: `${item.id}`,
        label: item.name,
      })) || [],
    isLoading,
    error,
  }
}

export default useGetCountiesAPI
