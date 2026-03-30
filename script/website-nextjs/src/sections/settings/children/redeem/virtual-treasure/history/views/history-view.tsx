'use client'

import Loading from '@/components/custom/loading'
import VirtualTreasureHistoryContainer from '../components/virtual-treasure-history-container'
import useHistoryView from '../hook/use-history-view'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'

function HistoryView() {
  const { historyList, isLoading, error } = useHistoryView()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="setting-panel-wrap">
      <div className="setting-panel-frame">
        <CategoryTitleBox>
          <CategoryTitle title="虛寶兌換紀錄" />
        </CategoryTitleBox>

        <VirtualTreasureHistoryContainer historyList={historyList} />
      </div>
    </div>
  )
}

export default HistoryView
