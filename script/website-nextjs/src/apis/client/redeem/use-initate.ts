import { useMutation } from '@tanstack/react-query'

import axios from '@/utils/axios'
import {
  RedeemInitiateReqType,
  RedeemInitiateResType,
  InitiateResSchema,
  RedeemPrefix,
} from './type'

const cacheKey = 'redeem/initiate'

async function initiateAPI(payload: RedeemInitiateReqType): Promise<RedeemInitiateResType> {
  try {
    const res = await axios.post(`/private/v1/${RedeemPrefix}/initiate`, payload, {
      _skipLogoutOn401: true,
      _skipRefreshAttempt: false,
    })
    return InitiateResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useInitiateAPI(onError: (error: any) => void) {
  return useMutation({
    mutationKey: [cacheKey],
    mutationFn: (payload: RedeemInitiateReqType) => initiateAPI(payload),
    onSuccess: (data) => {
      return data
    },
    onError: (error) => onError(error),
  })
}

export default useInitiateAPI
