export const dynamic = 'force-dynamic'
import { HomeView } from '@/sections/home/views'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '包鑽商城 Pointory - 點數兌換專屬平台',
  description:
    'Pointory 包鑽商城提供豐富的點數兌換商品，包含生活用品、3C產品、美食券等，讓您的積分更有價值。安全便捷的兌換體驗，立即開始您的積分之旅！',
  keywords: [
    '包鑽商城',
    '點數兌換',
    '獎勵',
    '商品兌換',
    'Pointory',
    '會員積分',
    '點數購物',
    '積分換商品',
  ],
  alternates: {
    canonical: 'https://808bonus.com.tw',
  },
  openGraph: {
    title: '包鑽商城 Pointory - 點數兌換專屬平台',
    description: 'Pointory 包鑽商城提供豐富的點數兌換商品，讓您的積分更有價值。',
    url: 'https://808bonus.com.tw',
    type: 'website',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Pointory 包鑽商城首頁',
      },
    ],
  },
}

export default function Home() {
  return <HomeView />
}
