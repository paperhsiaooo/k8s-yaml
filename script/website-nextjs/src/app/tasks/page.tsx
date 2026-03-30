import { TasksView } from '@/sections/tasks/views'
import WrapperLayout from '../layout/wrapper-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '任務中心 - 賺取積分任務',
  description:
    'Pointory 包鑽商城任務中心，完成各種任務賺取積分，包含每日任務、活動任務等，讓您的積分快速累積！',
  keywords: ['任務中心', '賺取積分', '每日任務', '活動任務', '積分累積', 'Pointory'],
  alternates: {
    canonical: 'https://808bonus.com.tw/tasks',
  },
  openGraph: {
    title: '任務中心 - 賺取積分任務',
    description: 'Pointory 包鑽商城任務中心，完成各種任務賺取積分！',
    url: 'https://808bonus.com.tw/tasks',
    type: 'website',
    images: [
      {
        url: '/images/og-tasks.jpg',
        width: 1200,
        height: 630,
        alt: 'Pointory 任務中心',
      },
    ],
  },
}

function TasksPage() {
  return (
    <WrapperLayout>
      <TasksView />
    </WrapperLayout>
  )
}

export default TasksPage
