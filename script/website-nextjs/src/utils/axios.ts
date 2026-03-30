import { AuthPrefix } from '@/apis/client/auth/type'
import { ERROR_CODE, SUCCESS_CODE } from '@/apis/constants/api-code'
import { logoutClient } from '@/auth/session'
import _axios, { AxiosError, AxiosRequestConfig } from 'axios'
import status from 'http-status'
import { toast } from 'sonner'

declare module 'axios' {
  export interface AxiosRequestConfig {
    _showToastOnError?: boolean
    _skipLogoutOn401?: boolean
    _skipRefreshAttempt?: boolean
    _retryCsrf?: boolean
  }
}

const REFRESH_ENDPOINT = `/public/v1/${AuthPrefix}/refresh`

let refreshRequest: Promise<void> | null = null

// CSRF Token 刷新相關
let isRefreshingCsrf: boolean = false
let csrfSubscribers: ((token: string) => void)[] = []

function onCsrfRefreshed(token: string) {
  csrfSubscribers.forEach((callback) => callback(token))
  csrfSubscribers = []
}

function addCsrfSubscriber(callback: (token: string) => void) {
  csrfSubscribers.push(callback)
}

function shouldAttemptRefresh(config?: AxiosRequestConfig) {
  if (!config || config._skipRefreshAttempt) return false

  const url = config.url ?? ''
  return (
    !url.includes(REFRESH_ENDPOINT) &&
    !url.includes('loginByToken') &&
    !url.includes('loginByToken')
  )
}

const axios = _axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: `${process.env.NEXT_PUBLIC_HOST_PATH || 'http://127.0.0.1:8080'}/api`,
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
})

axios.interceptors.response.use(
  (res) => {
    const { status: httpStatus } = res
    const { retStatus } = res.data
    const { svn, code } = retStatus

    if (httpStatus === status.OK) {
      if (code === SUCCESS_CODE) {
        return res.data.data
      }
      if (!ERROR_CODE[svn][code].customShow) {
        toast.error(ERROR_CODE[svn][code].message)
      }
    }
    return Promise.reject(retStatus)
  },
  async (err: AxiosError) => {
    const config = err.config as AxiosRequestConfig | undefined
    const showToastOnError = config?._showToastOnError !== false
    const shouldLogoutOn401 = config?._skipLogoutOn401 !== true

    if (err.response) {
      const {
        status: httpStatusCode,
        data,
        statusText,
      } = err.response as {
        status: number
        data?: { error?: string; retStatus?: { svn: string; code: string } }
        statusText: string
      }

      const apiMessage = data?.error
      const retStatus = data?.retStatus || { svn: 1, code: 0 }

      // csrf token 過期
      const isCSRFError =
        (httpStatusCode === status.FORBIDDEN && retStatus?.code === 111011) ||
        apiMessage?.toLocaleUpperCase().includes('CSRF')

      if (isCSRFError && !config?._retryCsrf) {
        // 如果正在刷新 CSRF Token，等待刷新完成
        if (isRefreshingCsrf) {
          return new Promise((resolve) => {
            addCsrfSubscriber((newToken: string) => {
              if (config?.headers) {
                config.headers['X-CSRF-Token'] = newToken
              }

              resolve(axios({ ...config }))
            })
          })
        }

        isRefreshingCsrf = true

        try {
          const { getCsrfAPI } = await import('@/apis/client/auth/use-get-csrf')

          const { csrfToken } = await getCsrfAPI(false)

          // 更新 CSRF Token
          setCsrfToken(csrfToken)

          // 通知所有等待的請求使用新的 CSRF Token
          onCsrfRefreshed(csrfToken)

          if (config?.headers) {
            config.headers['X-CSRF-Token'] = csrfToken
          }

          return axios({ ...config, _retryCsrf: true })
        } catch (refreshErr) {
          csrfSubscribers = []
          return Promise.reject(refreshErr)
        } finally {
          // 無論成功或失敗，都重置刷新狀態
          isRefreshingCsrf = false
        }
      }

      // 401 未授權，嘗試刷新 token
      if (httpStatusCode === status.UNAUTHORIZED) {
        if (shouldAttemptRefresh(config)) {
          if (!refreshRequest) {
            refreshRequest = axios
              .post(
                REFRESH_ENDPOINT,
                {},
                {
                  _skipRefreshAttempt: true,
                  _skipLogoutOn401: true,
                  _showToastOnError: false,
                  withCredentials: true,
                }
              )
              .then(() => undefined)
              .catch((refreshErr) => {
                logoutClient()
                throw refreshErr
              })
              .finally(() => {
                refreshRequest = null
              })
          }
          return refreshRequest.then(() =>
            axios(Object.assign({}, config, { _skipRefreshAttempt: true }))
          )
        }

        if (shouldLogoutOn401) {
          console.log('>>>??')

          logoutClient()
        }
      }

      // 顯示錯誤訊息
      if (showToastOnError) {
        if (
          retStatus &&
          ERROR_CODE[Number(retStatus.svn)]?.[Number(retStatus.code)] &&
          !ERROR_CODE[Number(retStatus.svn)][Number(retStatus.code)].customShow
        ) {
          toast.error(ERROR_CODE[Number(retStatus.svn)][Number(retStatus.code)].message)
        } else {
          toast.error(`系統錯誤 ${httpStatusCode}: ${statusText}`)
        }
      }

      const enhancedError = Object.assign(err, {
        httpStatus: httpStatusCode,
        retStatus,
        apiMessage,
      })

      return Promise.reject(enhancedError)
    }

    return Promise.reject(err)
  }
)

export function setCsrfToken(csrfToken: string) {
  axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
}

export default axios
