/**
 * 新增 entry 參數到 URL
 * @param url 要新增 entry 參數的 URL
 * @param entry 要新增的 entry 參數
 * @returns 新增 entry 參數後的 URL
 */
export function addEntryParam(url: string, entry: string): string {
  try {
    const urlObject = new URL(url, window.location.origin)
    urlObject.searchParams.set('entry', entry)
    return `${urlObject.pathname}${urlObject.search}${urlObject.hash}`
  } catch {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}entry=${encodeURIComponent(entry)}`
  }
}

/**
 * 從當前 URL 獲取 entry 參數
 * @param searchParams URLSearchParams 物件
 * @returns entry 參數值或 null
 */
export function getCurrentEntry(searchParams: URLSearchParams): string | null {
  return searchParams.get('entry')
}

/**
 * 檢查是否處於 webview 模式
 * @param searchParams URLSearchParams 物件
 * @returns 是否處於 webview 模式
 */
export function isWebviewMode(searchParams: URLSearchParams): boolean {
  return getCurrentEntry(searchParams) === 'webview'
}

/**
 * 建構帶有保留參數的 URL
 * @param newUrl 新的 URL 路徑
 * @param currentSearchParams 當前的 URLSearchParams
 * @param options 選項設定
 * @returns 合併參數後的完整 URL
 */
export function buildUrlWithParams(
  newUrl: string,
  currentSearchParams: URLSearchParams,
  options: {
    preserverEntry?: boolean
    preserveQuery?: boolean
    additionalParams?: Record<string, string>
  } = {}
): string {
  const { preserverEntry = true, preserveQuery = true, additionalParams = {} } = options

  try {
    const url = new URL(newUrl, window.location.origin)

    if (preserveQuery) {
      currentSearchParams.forEach((value, key) => {
        if (!url.searchParams.has(key)) {
          url.searchParams.set(key, value)
        }
      })
    }

    // 處理 entry 參數
    if (preserverEntry) {
      const currentEntry = getCurrentEntry(currentSearchParams)
      if (currentEntry) {
        url.searchParams.set('entry', currentEntry)
      }
    }

    // 添加額外的參數
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    // 降級處理：簡單字串拼接
    let result = newUrl
    const separator = newUrl.includes('?') ? '&' : '?'

    const params: string[] = []

    if (preserveQuery) {
      currentSearchParams.forEach((value, key) => {
        if (!newUrl.includes(`${key}=`)) {
          params.push(`${key}=${encodeURIComponent(value)}`)
        }
      })
    }

    if (preserverEntry) {
      const currentEntry = getCurrentEntry(currentSearchParams)
      if (currentEntry && !newUrl.includes('entry=')) {
        params.push(`entry=${encodeURIComponent(currentEntry)}`)
      }
    }

    Object.entries(additionalParams).forEach(([key, value]) => {
      params.push(`${key}=${encodeURIComponent(value)}`)
    })

    if (params.length > 0) {
      result += separator + params.join('&')
    }

    return result
  }
}
