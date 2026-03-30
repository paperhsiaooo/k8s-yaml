import { useMutation } from '@tanstack/react-query'

import axios from '@/utils/axios'
import { RedeemPrefix } from '../type'
import {
  PhysicalConfirmReqType,
  PhysicalConfirmResSchema,
  PhysicalConfirmResType,
  PhysicalPrefix,
} from './type'

const cacheKey = `redeem/${PhysicalPrefix}/confirm`

async function physicalConfirmAPI(
  payload: PhysicalConfirmReqType
): Promise<PhysicalConfirmResType> {
  try {
    const res = await axios.post(`/private/v1/${RedeemPrefix}/${PhysicalPrefix}/confirm`, payload, {
      _showToastOnError: true,
    })
    return PhysicalConfirmResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function usePhysicalConfirmAPI() {
  return useMutation({
    mutationKey: [cacheKey],
    mutationFn: (payload: PhysicalConfirmReqType) => physicalConfirmAPI(payload),
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.log('error: ', error)
    },
  })
}

export default usePhysicalConfirmAPI
