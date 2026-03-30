import { useMutation } from '@tanstack/react-query'

import axios from '@/utils/axios'
import { AuthPrefix, CheckSessionReqType, CheckSessionResSchema, CheckSessionResType } from './type'

const cacheKey = 'checkSession'

async function checkSessionAPI(payload: CheckSessionReqType): Promise<CheckSessionResType> {
  try {
    const res = await axios.post(`/private/v1/${AuthPrefix}/checkSession`, payload, {
      _skipRefreshAttempt: false,
      _skipLogoutOn401: true,
      _showToastOnError: false,
    })
    return CheckSessionResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useCheckSessionAPI() {
  return useMutation({
    mutationKey: [`${AuthPrefix}/${cacheKey}`],
    mutationFn: checkSessionAPI,
  })
}

export default useCheckSessionAPI
