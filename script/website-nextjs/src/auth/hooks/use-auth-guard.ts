'use client'

import useAuthStore from '@/store/global/use-auth'
import { useEffect, useMemo } from 'react'
import { ACCESS_TOKEN_KEY } from '../context'
import { useSetState } from '@/hooks/use-set-state'
import useCheckUserSession from '@/hooks/use-check-user-session'

function useAuthGuard() {
  const auth = useAuthStore((state) => state.auth)
  const setIsLogin = useAuthStore((state) => state.setIsLogin)

  const { state, setState } = useSetState({
    loading: true,
  })

  const { checkUserSession } = useCheckUserSession({
    accessTokenKey: ACCESS_TOKEN_KEY,
    onSuccess: () => {
      setState({ loading: false })
      setIsLogin(true)
    },
    onFail: () => {
      setState({ loading: false })
      setIsLogin(false)
    },
    onError: () => {
      setState({ loading: false })
    },
  })

  useEffect(() => {
    checkUserSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAuthenticated = auth.isLogin ? 'authenticated' : 'unauthenticated'

  const status = state.loading ? 'loading' : checkAuthenticated

  const memoizedValue = useMemo(
    () => ({
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [status]
  )

  return memoizedValue
}

export default useAuthGuard
