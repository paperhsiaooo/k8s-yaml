import NewView from '@/sections/news/children/new/views/new-view'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{
    newId: string
  }>
}

// TODO: 這裡需要根據實際的 API 來獲取文章資料
// 目前先提供基本的 metadata 結構
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { newId } = await params

  // 這裡應該要從 API 獲取文章資料
  // const article = await getArticleDetail(newId)

  return {
    title: `最新消息 - 包鑽商城動態`,
    description: '查看 Pointory 包鑽商城的最新消息詳情，掌握第一手積分兌換情報！',
    keywords: ['最新消息', '活動公告', '包鑽商城', '商品更新', '兌換資訊', 'Pointory'],
    alternates: {
      canonical: `https://808bonus.com.tw/news/${newId}`,
    },
    openGraph: {
      title: `最新消息 - 包鑽商城動態`,
      description: '查看 Pointory 包鑽商城的最新消息詳情！',
      url: `https://808bonus.com.tw/news/${newId}`,
      type: 'website',
      images: [
        {
          url: '/images/og-news-detail.jpg',
          width: 1200,
          height: 630,
          alt: 'Pointory 最新消息詳情',
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

async function NewPage({ params }: Props) {
  const { newId } = await params

  return <NewView newId={newId} />
}

export default NewPage
