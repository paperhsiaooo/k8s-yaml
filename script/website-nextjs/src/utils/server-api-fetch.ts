import 'server-only'

import { isHttpError } from '@/utils/http-status'
import { cookies } from 'next/headers'

export type ServerApiFetchError = {
  httpStatus: number
  requestId?: string | null
}

export type ServerApiFetchInit = RequestInit & {
  /**
   * 從回應標頭讀取 requestId 時所接受的標頭名稱（會依序嘗試）。
   * 預設：['x-request-id', 'x-correlation-id', 'traceparent']
   */
  requestIdHeaderNames?: string[]
  /**
   * 若上游未回傳 requestId，是否自動產生一組並放入錯誤物件（同時也可加到送出的請求標頭）。
   * 預設：true
   */
  generateRequestIdIfMissing?: boolean
  /**
   * 送出請求時要帶的 requestId 標頭名稱（若要主動種下相關性 ID）。
   * 預設：'x-request-id'
   */
  outgoingRequestIdHeaderName?: string
}

/**
 * 伺服端專用 fetch 封裝：
 * - 自動帶上目前請求的 cookies（供後端驗證 accessToken）
 * - 預設 `cache: 'no-store'`（避免快取舊資料）
 * - HTTP 4xx/5xx 直接拋錯 `{ httpStatus, requestId }`
 */
export async function serverApiFetch(input: string, init?: ServerApiFetchInit): Promise<Response> {
  // 取出本次請求的 cookies 並轉為 header 字串
  const cookieHeader = (await cookies()).toString()

  // 規範化 headers，便於讀寫與覆蓋
  const baseHeaders = new Headers(init?.headers ?? {})
  if (cookieHeader) baseHeaders.set('cookie', cookieHeader)

  // 若需要，主動種下 requestId（避免上游未回傳時無法關聯）
  const shouldGenerate = init?.generateRequestIdIfMissing ?? true
  const outgoingHeaderName = init?.outgoingRequestIdHeaderName ?? 'x-request-id'
  if (shouldGenerate) {
    const hasAnyCorrelationId =
      baseHeaders.has(outgoingHeaderName) ||
      ['x-request-id', 'x-correlation-id', 'traceparent'].some((h) => baseHeaders.has(h))
    if (!hasAnyCorrelationId) {
      const generated =
        (
          globalThis as unknown as { crypto?: { randomUUID?: () => string } }
        ).crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)
      baseHeaders.set(outgoingHeaderName, generated)
    }
  }

  const response = await fetch(input, {
    ...init,
    cache: init?.cache ?? 'no-store',
    headers: baseHeaders,
  })

  const httpStatus = response.status
  if (isHttpError(httpStatus)) {
    const headerNames = init?.requestIdHeaderNames ?? [
      'x-request-id',
      'x-correlation-id',
      'traceparent',
    ]
    const requestIdFromResponse = headerNames
      .map((h) => response.headers.get(h))
      .find((v) => Boolean(v))
    const requestId = requestIdFromResponse ?? baseHeaders.get(outgoingHeaderName)
    throw { httpStatus, requestId } as ServerApiFetchError
  }

  return response
}

/**
 * 便捷 JSON 解析：在 `serverApiFetch` 之上回傳已解析的 JSON。
 * 若回傳內容非 JSON，會丟出原生例外（視為 500 類型問題，交由外層處理）。
 */
export async function serverApiJson<T>(input: string, init?: ServerApiFetchInit): Promise<T> {
  const res = await serverApiFetch(input, init)
  return (await res.json()) as T
}
