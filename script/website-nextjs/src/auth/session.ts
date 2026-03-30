// src/auth/session.ts:1
'use client'

import { ACCESS_TOKEN_KEY } from '@/auth/context'
import useAuthStore from '@/store/global/use-auth'
import useMemberStore from '@/store/global/use-member'

type LogoutOptions = {
  preserveStorage?: boolean
}

/**
 * Centralized client-side logout cleanup.
 * - resets zustand stores
 * - clears browser-accessible token footprints (unless preserved)
 */
export function logoutClient(options?: LogoutOptions) {
  const authStore = useAuthStore.getState()
  const memberStore = useMemberStore.getState()

  authStore.reset()
  memberStore.reset()

  if (options?.preserveStorage || typeof window === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.warn('[logoutClient] failed to remove access token from localStorage', error)
  }

  try {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.warn('[logoutClient] failed to remove access token from sessionStorage', error)
  }
}
