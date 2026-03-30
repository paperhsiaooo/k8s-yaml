import WrapperLayout from '@/app/layout/wrapper-layout'
import { AuthGuard } from '@/auth/guard'
import CategoryToggleContainer from '@/sections/settings/components/category-toggle-container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '會員設定',
  description: '管理您的會員設定和會員資料',
  robots: 'noindex, nofollow',
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex-1 flex flex-col">
        {/* <SettingsBreadcrumbs /> */}
        <div className="bg-yile-100 flex flex-1 flex-col footer-padding">
          <WrapperLayout>
            <div className="mb-4 1440:mb-6">
              <CategoryToggleContainer />
            </div>
          </WrapperLayout>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </AuthGuard>
  )
}

export default Layout
