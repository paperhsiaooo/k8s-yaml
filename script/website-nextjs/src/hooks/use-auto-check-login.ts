'use client'

import { ACCESS_TOKEN_KEY } from '@/auth/context'
import { useMemberInfo } from '@/hooks/use-member-info'
import useAuthStore from '@/store/global/use-auth'
import { useEntryModeStore } from '@/store/global/use-entry-mode'
import { useMemo } from 'react'

function hasSessionToken() {
  if (typeof document === 'undefined') return false

  const raw = document.cookie.split('; ').find((row) => row.startsWith(`${ACCESS_TOKEN_KEY}=`))
  if (!raw) return false

  const value = raw.substring(`${ACCESS_TOKEN_KEY}=`.length)
  try {
    const parsed = JSON.parse(value)
    return parsed && parsed !== 'null' && parsed !== 'undefined'
  } catch {
    return value && value !== 'null' && value !== 'undefined'
  }
}

export function useAutoCheckLogin(csrfToken?: string) {
  const entryModeReady = useEntryModeStore((state) => state.isReady)
  const isLogin = useAuthStore((state) => state.auth.isLogin)
  const hasToken = useMemo(() => (entryModeReady ? hasSessionToken() : false), [entryModeReady])
  const shouldCheck = !!csrfToken && entryModeReady && (isLogin || hasToken)

  useMemberInfo(shouldCheck, {
    showToastOnError: false,
  })
}
