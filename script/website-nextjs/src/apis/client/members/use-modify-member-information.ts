import { useMutation } from '@tanstack/react-query'

import axios from '@/utils/axios'
import {
  ModifyMemberInformationReqType,
  ModifyMemberInformationResType,
  ModifyMemberInformationResSchema,
  MembersPrefix,
} from './type'

const cacheKey = 'modifyMemberInformation'

async function modifyMemberInformationAPI(
  payload: ModifyMemberInformationReqType
): Promise<ModifyMemberInformationResType> {
  try {
    const res = await axios.patch(`/private/v1/${MembersPrefix}`, payload, {
      _showToastOnError: true,
    })
    return ModifyMemberInformationResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useModifyMemberInformationAPI() {
  return useMutation({
    mutationKey: [cacheKey],
    mutationFn: (payload: ModifyMemberInformationReqType) => modifyMemberInformationAPI(payload),
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.log('error: ', error)
    },
  })
}

export default useModifyMemberInformationAPI
