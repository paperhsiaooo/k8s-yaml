import { useMutation } from '@tanstack/react-query'

import axios from '@/utils/axios'
import { AuthPrefix, LoginByTokenReqType, LoginByTokenResSchema, LoginByTokenResType } from './type'

const cacheKey = 'loginByToken'

async function loginByTokenAPI(payload: LoginByTokenReqType): Promise<LoginByTokenResType> {
  try {
    const res = await axios.post(`/public/v1/${AuthPrefix}/loginByToken`, payload)
    return LoginByTokenResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useLoginByTokenAPI() {
  return useMutation({
    mutationKey: [`${AuthPrefix}/${cacheKey}`],
    mutationFn: (payload: LoginByTokenReqType) => loginByTokenAPI(payload),
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.log('error: ', error)
    },
  })
}

export default useLoginByTokenAPI
