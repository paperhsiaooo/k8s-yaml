export type ConfigValue = {
  isStaticExport: boolean
  site: {
    name: string
    serverUrl: string
    basePath: string
    serviceEmail: string
    serviceTime: string
    copyright: string
  }
  auth: {
    method: 'jwt' | 'auth0'
    skip: boolean
  }
}

export const CONFIG: ConfigValue = {
  site: {
    name: 'Pointory',
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    serviceEmail: 'service@808bonus.com.tw',
    serviceTime: '營業時間 (每日24小時服務)',
    copyright: 'Copyright © JAJING TECHNOLOGY CO., LTD.',
  },
  // isStaticExport: JSON.parse(`${process.env.BUILD_STATIC_EXPORT}`),
  isStaticExport: false,
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'jwt',
    skip: false,
  },
}
