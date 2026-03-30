'use client'

import { useAutoCheckLogin } from '@/hooks/use-auto-check-login'
import { useEntryMode } from '@/hooks/use-entry-mode'
import useGetCsrfToken from '@/hooks/use-get-csrf-token'

export default function AppSetup() {
  // 1. 獲取 csrf token
  const csrfToken = useGetCsrfToken()

  // 2. 將 Token 傳入 useEntryMode，內部會等待 Token 準備好才執行 OneTimeToken Login
  useEntryMode(csrfToken)

  // 3. 執行自動檢查登入
  useAutoCheckLogin(csrfToken)
  return null
}
