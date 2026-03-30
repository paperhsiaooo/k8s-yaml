import { useCallback } from 'react'

import useCheckSessionAPI from '@/apis/client/auth/use-check-session'

function useCheckUserSession({
  accessTokenKey,
  onSuccess,
  onFail,
  onError,
}: {
  accessTokenKey: string
  onSuccess: () => void
  onFail: () => void
  onError: () => void
}) {
  const { mutateAsync: checkSession } = useCheckSessionAPI()

  const checkUserSession = useCallback(async () => {
    try {
      const directCookieCheck = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${accessTokenKey}=`))

      let actualToken = null
      if (directCookieCheck) {
        const tokenValue = directCookieCheck.substring(`${accessTokenKey}=`.length)
        try {
          actualToken = JSON.parse(tokenValue)
        } catch {
          actualToken = tokenValue
        }
      }

      const hasValidToken = actualToken && actualToken !== 'null' && actualToken !== 'undefined'
      if (hasValidToken) {
        try {
          await checkSession(null)
          onSuccess()
        } catch (apiError) {
          const httpStatus = (apiError as { httpStatus?: number })?.httpStatus

          if (typeof httpStatus === 'number' && httpStatus !== 200) {
            onFail()
            return
          }

          throw apiError
        }
      } else {
        onFail()
      }
    } catch (error) {
      console.error(error)
      onError()
    }
  }, [checkSession, onSuccess, onFail, onError, accessTokenKey])

  return {
    checkUserSession,
  }
}

export default useCheckUserSession
