import { memo } from 'react'
import { ProductsView } from '.'
import { OrganizationSchema, WebSiteSchema } from '@/components/structured-data'

function HomeView() {
  return (
    <>
      {/* 結構化資料 */}
      <OrganizationSchema
        name="Pointory 包鑽商城"
        url="https://808bonus.com.tw"
        logo="https://808bonus.com.tw/images/logo.webp"
        description="Pointory 包鑽商城提供豐富的點數兌換商品，讓您的積分更有價值。"
      />
      <WebSiteSchema
        name="Pointory 包鑽商城"
        url="https://808bonus.com.tw"
        potentialAction={{
          target: 'https://808bonus.com.tw/search?q={search_term_string}',
          queryInput: 'required name=search_term_string',
        }}
      />

      {/* Wrapper */}
      <div className="flex-1 flex flex-col">
        {/* <MainView /> */}
        {/* <NewsView /> */}
        <ProductsView className="flex-1" />
        {/* <TaskView /> */}
      </div>
    </>
  )
}

export default memo(HomeView)
