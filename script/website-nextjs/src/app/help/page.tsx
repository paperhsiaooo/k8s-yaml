import { HelpView } from '@/sections/help/views'
import WrapperLayout from '../layout/wrapper-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '幫助中心 - 包鑽商城使用指南',
  description:
    'Pointory 包鑽商城幫助中心，提供詳細的使用指南、常見問題解答、兌換流程說明等，讓您輕鬆使用積分兌換功能！',
  keywords: ['幫助中心', '使用指南', '常見問題', '兌換流程', '包鑽商城', 'Pointory'],
  alternates: {
    canonical: 'https://808bonus.com.tw/help',
  },
  openGraph: {
    title: '幫助中心 - 包鑽商城使用指南',
    description: 'Pointory 包鑽商城幫助中心，提供詳細的使用指南和常見問題解答！',
    url: 'https://808bonus.com.tw/help',
    type: 'website',
    images: [
      {
        url: '/images/og-help.jpg',
        width: 1200,
        height: 630,
        alt: 'Pointory 幫助中心',
      },
    ],
  },
}

function HelpPage() {
  return (
    <WrapperLayout>
      <HelpView />
    </WrapperLayout>
  )
}

export default HelpPage
