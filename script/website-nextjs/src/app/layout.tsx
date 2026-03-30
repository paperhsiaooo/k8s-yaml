import '@/app/globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Devanagari, Noto_Sans_TC } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Viewport } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { headers } from 'next/headers'
import GlobalProvider from '@/provider/global-provider'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

type Props = {
  children: React.ReactNode
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  preload: true,
  display: 'swap',
})

const ibmPlexSansDevanagari = IBM_Plex_Sans_Devanagari({
  variable: '--font-ibm-plex-sans-devanagari',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

// 環境變數控制索引
const isIndexingAllowed = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

export const metadata: Metadata = {
  metadataBase: new URL('https://808bonus.com.tw'),
  title: {
    default: '包鑽商城 Pointory - 點數兌換專屬平台',
    template: '%s | 包鑽商城 Pointory',
  },
  description:
    'Pointory 包鑽商城提供豐富的點數兌換商品，包含生活用品、3C產品、美食券等，讓您的積分更有價值。安全便捷的兌換體驗，立即開始您的積分之旅！',
  keywords: [
    '包鑽商城',
    '點數兌換',
    '獎勵',
    '商品兌換',
    '808bonus',
    'Pointory',
    '會員積分',
    '點數購物',
    '積分換商品',
  ],
  authors: [
    {
      name: '808bonus',
    },
  ],
  creator: '808bonus',
  publisher: '808bonus',
  robots: isIndexingAllowed
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, nofollow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh-TW',
    url: 'https://808bonus.com.tw',
    siteName: 'Pointory 包鑽商城',
    title: 'Pointory 包鑽商城 - 點數兌換專屬平台',
    description:
      'Pointory 包鑽商城提供豐富的點數兌換商品，包含生活用品、3C產品、美食券等，讓您的積分更有價值。',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pointory 包鑽商城',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pointory 包鑽商城 - 點數兌換專屬平台',
    description: 'Pointory 包鑽商城提供豐富的點數兌換商品，讓您的積分更有價值。',
    images: ['/images/og-image.jpg'],
  },
}

const VersionHelper = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.__version = async function(key) {
            if (!key) {
              console.warn('Usage: __version("your-key")');
              return;
            }
            try {
              const res = await fetch('/api/public/v1/version', {
                headers: { 'X-Internal-Version-Key': key }
              });

              if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
              const data = await res.json();
              const golangVersion = data.data.version

              console.table({
                '前端': { '版本': '${process.env.NEXT_PUBLIC_VERSION ?? ''}' },
                'API': { '版本': golangVersion }
              });

              return null;
            } catch(e) {
              console.error('❌ Version fetch failed:', e.message);
            }
          };
        `,
      }}
    />
  )
}

export default async function Layout({ children }: Props) {
  const nonce = (await headers()).get('x-nonce') || undefined

  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.variable} ${ibmPlexSansDevanagari.variable} antialiased`}>
        <NuqsAdapter>
          <GlobalProvider>{children}</GlobalProvider>
        </NuqsAdapter>
        <Toaster position="top-right" />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} nonce={nonce} />
        <VersionHelper />
      </body>
    </html>
  )
}
