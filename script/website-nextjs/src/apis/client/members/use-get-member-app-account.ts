import { useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import {
  MembersPrefix,
  MembersAppAccountResSchema,
  MembersAppAccountResType,
  GET_MEMBERS_APP_ACCOUNT_RES_DEFAULT,
} from './type'

const cacheKey = 'getMemberAppAccount'

async function getMemberAppAccountAPI(
  showToastOnError: boolean
): Promise<MembersAppAccountResType> {
  try {
    const res = await axios.get(`/private/v1/${MembersPrefix}/appAccounts`, {
      _showToastOnError: showToastOnError,
    })

    return MembersAppAccountResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useGetMemberAppAccountAPI(params: any, options?: { showToastOnError?: boolean }) {
  const { showToastOnError = true } = options || {}
  return useQuery({
    queryKey: [`${MembersPrefix}/${cacheKey}`, params],
    queryFn: () => getMemberAppAccountAPI(showToastOnError),
    enabled: !!params,
    initialData: GET_MEMBERS_APP_ACCOUNT_RES_DEFAULT,
  })
}

export default useGetMemberAppAccountAPI
