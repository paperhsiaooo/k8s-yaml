import { useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import { MembersPrefix, MembersResSchema, MembersResType } from './type'

const cacheKey = 'getMemberInformation'

async function getMemberInformationAPI(showToastOnError: boolean): Promise<MembersResType> {
  try {
    const res = await axios.get(`/private/v1/${MembersPrefix}`, {
      _showToastOnError: showToastOnError,
    })
    return MembersResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useGetMemberInformationAPI(params: any, options?: { showToastOnError?: boolean }) {
  const { showToastOnError = true } = options || {}
  return useQuery({
    queryKey: [`${MembersPrefix}/${cacheKey}`, params],
    queryFn: () => getMemberInformationAPI(showToastOnError),
    enabled: !!params,
  })
}

export default useGetMemberInformationAPI
