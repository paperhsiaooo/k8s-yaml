import type { NextConfig } from 'next'
const env = process.env.NEXT_PUBLIC_RUN_MODE ?? 'dev'
const isDev = env === 'dev'
const isProduction = env === 'prod'
const isStaging = env === 'staging'
const isQa = env === 'qa'

const cdnHostMap = {
  dev: ['dev-cdn-data.808bonus.com.tw', 'dev-cdn.online808.com'],
  qa: ['qa-cdn-data.808bonus.com.tw', 'qa2-cdn.online808.com'],
  staging: ['stage-cdn-data.808bonus.com.tw', 'stage-cdn.online808.com'],
  prod: ['cdn-data.808bonus.com.tw', 'cdn-data.online808.com'],
} as const
const cdnHosts = cdnHostMap[env as keyof typeof cdnHostMap]

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns:
      isDev || isStaging || isProduction || isQa
        ? cdnHosts.map((host) => ({ protocol: 'https', hostname: host }))
        : [
            {
              protocol: 'https',
              hostname: '**',
            },
            {
              protocol: 'http',
              hostname: '**',
            },
          ],
    minimumCacheTTL: 0,
  },
  compiler: {
    removeConsole: isQa || isStaging || isProduction ? { exclude: ['error'] } : false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site',
          },
        ],
      },
    ]
  },
}

export default nextConfig
