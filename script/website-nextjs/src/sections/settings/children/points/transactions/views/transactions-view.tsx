'use client'

import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'
import TransactionContainer from '../components/transaction-container'
import TransactionToggleButtonGroup from '../components/transaction-toggle-button-group'
import useTransactionsView from '../hook/use-transactions-view'
import TransactionPaginationGroup from '../components/transaction-pagination-group'

function TransactionsView() {
  const {
    monthOptions,
    historyList,
    totalCount,
    currentPage,
    pageSize,
    activeMonth,
    activeType,
    handleToggleButtonChange,
    handleTypeButtonChange,
    handlePageChange,
  } = useTransactionsView()

  return (
    <div className="setting-panel-wrap">
      <div className="setting-panel-frame">
        <CategoryTitleBox>
          <CategoryTitle title="點數兌換紀錄" />
        </CategoryTitleBox>

        <TransactionToggleButtonGroup
          className="mb-4 640:mb-5 1440:mb-9"
          monthOptions={monthOptions}
          activeMonth={activeMonth}
          activeType={activeType}
          handleToggleButtonChange={handleToggleButtonChange}
          handleTypeButtonChange={handleTypeButtonChange}
        />

        <TransactionContainer historyList={historyList} className="mb-4 640:mb-5 1440:mb-9" />

        <TransactionPaginationGroup
          className="pb-[30px] 1440:pb-[60px]"
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default TransactionsView
