'use client'

import { useSearchParams } from 'next/navigation'
import { isWebviewMode } from '@/utils/url-helper'

export function useLayoutMode() {
  const searchParams = useSearchParams()
  const isWebview = isWebviewMode(searchParams)

  return {
    isWebview,
    entry: searchParams.get('entry'),
  }
}
