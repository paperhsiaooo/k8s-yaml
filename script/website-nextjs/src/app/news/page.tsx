import { NewsView } from '@/sections/news/views'
import WrapperLayout from '../layout/wrapper-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '最新消息 - 包鑽商城動態',
  description:
    '查看 Pointory 包鑽商城的最新消息、活動公告、商品更新等資訊，掌握第一手積分兌換情報！',
  keywords: ['最新消息', '活動公告', '包鑽商城', '商品更新', '兌換資訊', 'Pointory'],
  alternates: {
    canonical: 'https://808bonus.com.tw/news',
  },
  openGraph: {
    title: '最新消息 - 包鑽商城動態',
    description: '查看 Pointory 包鑽商城的最新消息、活動公告、商品更新等資訊！',
    url: 'https://808bonus.com.tw/news',
    type: 'website',
    images: [
      {
        url: '/images/og-news.jpg',
        width: 1200,
        height: 630,
        alt: 'Pointory 最新消息',
      },
    ],
  },
}

function NewsPage() {
  return (
    <WrapperLayout>
      <NewsView />
    </WrapperLayout>
  )
}

export default NewsPage
