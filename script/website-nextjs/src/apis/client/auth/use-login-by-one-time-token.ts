import { useMutation } from '@tanstack/react-query'

import axios from '@/utils/axios'
import {
  AuthPrefix,
  LoginByOneTimeTokenReqType,
  LoginByOneTimeTokenResSchema,
  LoginByOneTimeTokenResType,
} from './type'

const cacheKey = 'loginByOneTimeToken'

async function loginByOneTimeTokenAPI(
  payload: LoginByOneTimeTokenReqType
): Promise<LoginByOneTimeTokenResType> {
  try {
    const res = await axios.post(`/public/v1/${AuthPrefix}/loginByOneTimeToken`, payload, {
      _skipRefreshAttempt: true,
      _skipLogoutOn401: true,
      _showToastOnError: false,
    })
    return LoginByOneTimeTokenResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useLoginByOneTimeTokenAPI() {
  return useMutation({
    mutationKey: [`${AuthPrefix}/${cacheKey}`],
    mutationFn: loginByOneTimeTokenAPI,
  })
}

export default useLoginByOneTimeTokenAPI
