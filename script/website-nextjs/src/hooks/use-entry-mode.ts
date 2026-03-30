'use client'

import { useSearchParams } from 'next/navigation'
import { useSessionStorage } from './use-session-storage'
import { useLayoutEffect, useRef } from 'react'
import useAuthStore from '@/store/global/use-auth'
import { WEBVIEW_SESSION_STORAGE_KEY } from './use-webview'
import { useEntryModeStore } from '@/store/global/use-entry-mode'
// import { logoutClient } from '@/auth/session'
import useLoginByOneTimeTokenAPI from '@/apis/client/auth/use-login-by-one-time-token'

export function useEntryMode(csrfToken?: string) {
  const handledTokenRef = useRef<string | null>(null)
  const searchParams = useSearchParams()
  const { mutateAsync: loginByOneTimeTokenAPI } = useLoginByOneTimeTokenAPI()
  const setIsLogin = useAuthStore((state) => state.setIsLogin)
  const setReady = useEntryModeStore((state) => state.setReady)

  const { state: storedEntryMode, setState: setStoredEntryMode } = useSessionStorage<string>(
    WEBVIEW_SESSION_STORAGE_KEY,
    ''
  )

  useLayoutEffect(() => {
    const urlEntry = searchParams.get('entry')
    if (urlEntry && urlEntry !== storedEntryMode) {
      setStoredEntryMode(urlEntry)
    }
  }, [searchParams, setStoredEntryMode, storedEntryMode])

  useLayoutEffect(() => {
    if (!csrfToken) return

    let cancelled = false

    const process = async () => {
      try {
        const oneTimeCode = searchParams.get('oneTimeCode')
        if (!oneTimeCode) {
          setReady(true)
          return
        }

        if (handledTokenRef.current === oneTimeCode) {
          setReady(true)
          return
        }

        handledTokenRef.current = oneTimeCode

        await loginByOneTimeTokenAPI({ token: oneTimeCode })

        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', window.location.pathname)
        }

        if (!cancelled) {
          setIsLogin(true)
        }
      } catch (error) {
        console.error('[useEntryMode] exchange code failed', error)
        // logoutClient()
      } finally {
        if (!cancelled) {
          setReady(true)
        }
      }
    }

    process()

    return () => {
      cancelled = true
    }
  }, [csrfToken, handledTokenRef, loginByOneTimeTokenAPI, searchParams, setIsLogin, setReady])

  return null
}
