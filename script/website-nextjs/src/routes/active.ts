'use client'

import { usePathname } from '@/routes/hooks'

export type IsActiveOptions = {
  // exact: true -> 必須完整相等
  // exact: false -> 允許子路徑（例如 /settings 命中 /settings/profile）
  exact?: boolean
}

// 移除查詢參數與 hash
export function stripQueryHash(input: string): string {
  const i = input.indexOf('?')
  const j = input.indexOf('#')
  const cut = Math.min(i === -1 ? input.length : i, j === -1 ? input.length : j)
  return input.slice(0, cut)
}

// 正規化路徑：確保開頭/、去尾斜線（/ 除外）、移除 query/hash
export function normalizePath(p: string): string {
  if (!p) return '/'
  const withoutQ = stripQueryHash(p.trim())
  const withLeading = withoutQ.startsWith('/') ? withoutQ : `/${withoutQ}`
  if (withLeading !== '/' && withLeading.endsWith('/')) {
    return withLeading.slice(0, -1)
  }
  return withLeading
}

// 判斷當前路徑是否命中目標路徑
export function isPathActive(current: string, target: string, opts: IsActiveOptions = {}): boolean {
  const { exact = true } = opts
  const c = normalizePath(current)
  const t = normalizePath(target)
  if (exact) return c === t
  if (t === '/') return true
  return c === t || c.startsWith(`${t}/`)
}

// Hook 版本，直接吃目標 path
export function useIsActive(target: string, opts?: IsActiveOptions): boolean {
  const pathname = usePathname()
  return isPathActive(pathname ?? '/', target, opts)
}
