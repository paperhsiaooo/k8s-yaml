import { useMutation } from '@tanstack/react-query'

import axios from '@/utils/axios'
import { RedeemPrefix } from '../type'
import {
  VirtualTreasureConfirmReqType,
  VirtualTreasureConfirmResType,
  VirtualTreasureConfirmResSchema,
  VirtualTreasurePrefix,
} from './type'

const cacheKey = `redeem/${VirtualTreasurePrefix}/confirm`

async function virtualTreasureConfirmAPI(
  payload: VirtualTreasureConfirmReqType
): Promise<VirtualTreasureConfirmResType> {
  try {
    const res = await axios.post(
      `/private/v1/${RedeemPrefix}/${VirtualTreasurePrefix}/confirm`,
      payload
    )
    return VirtualTreasureConfirmResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useVirtualTreasureConfirmAPI() {
  return useMutation({
    mutationKey: [cacheKey],
    mutationFn: (payload: VirtualTreasureConfirmReqType) => virtualTreasureConfirmAPI(payload),
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.log('error: ', error)
    },
  })
}

export default useVirtualTreasureConfirmAPI
