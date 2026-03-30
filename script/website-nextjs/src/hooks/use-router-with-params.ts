import { buildUrlWithParams } from '@/utils/url-helper'
import { useRouter, useSearchParams } from 'next/navigation'

export function useRouterWithParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const pushWithParams = (
    url: string,
    options: {
      preserveEntry?: boolean
      preserveQuery?: boolean
      additionalParams?: Record<string, string>
    } = {}
  ) => {
    const finalUrl = buildUrlWithParams(url, searchParams, options)
    router.push(finalUrl)
  }

  const replaceWithParams = (
    url: string,
    options: {
      preserveEntry?: boolean
      preserveQuery?: boolean
      additionalParams?: Record<string, string>
    } = {}
  ) => {
    const finalUrl = buildUrlWithParams(url, searchParams, options)
    router.replace(finalUrl)
  }

  return {
    ...router,
    pushWithParams,
    replaceWithParams,
  }
}
