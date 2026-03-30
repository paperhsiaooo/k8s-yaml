// 建議：src/utils/http-error-policy.ts
import { notFound } from 'next/navigation'

type Action = { type: 'inPage'; code: number } | { type: 'thrown' }
export function handleHttpError(status: number): Action {
  if (status === 404) {
    notFound()
  }

  if (status === 401) {
    return { type: 'inPage', code: 401 }
  }

  if (status === 403) {
    return { type: 'inPage', code: 403 }
  }
  if (status >= 400 && status < 500) {
    return { type: 'inPage', code: status }
  }

  return { type: 'thrown' } // 交給 error.tsx (500)
}
