import useGetCsrfAPI from '@/apis/client/auth/use-get-csrf'
import { setCsrfToken } from '@/utils/axios'
import { useEffect } from 'react'

function useGetCsrfToken() {
  const { data } = useGetCsrfAPI({
    showToastOnError: false,
  })

  const csrfToken = data?.csrfToken

  useEffect(() => {
    if (csrfToken) {
      setCsrfToken(csrfToken)
    }
  }, [csrfToken])

  return csrfToken
}

export default useGetCsrfToken
