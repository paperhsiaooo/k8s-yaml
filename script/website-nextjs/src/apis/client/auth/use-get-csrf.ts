import { useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import { GetCsrfResSchema, AuthPrefix, GetCsrfResType } from './type'

const cacheKey = 'getCsrf'

export async function getCsrfAPI(showToastOnError: boolean): Promise<GetCsrfResType> {
  try {
    const res = await axios.get(`/public/v1/${AuthPrefix}/csrf`, {
      _showToastOnError: showToastOnError,
      _retryCsrf: true,
    })

    return GetCsrfResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetCsrfAPI(options?: { showToastOnError?: boolean }) {
  const { showToastOnError = false } = options || {}
  return useQuery({
    queryKey: [`${AuthPrefix}/${cacheKey}`],
    queryFn: () => getCsrfAPI(showToastOnError),
    staleTime: Infinity,
  })
}

export default useGetCsrfAPI
