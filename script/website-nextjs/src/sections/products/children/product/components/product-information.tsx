'use client'

import { memo } from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import ContentBlock from './content-block'
import useProductInformation, { TABS } from '../hook/use-product-information'
import ProductTabToggleButtonGroup from '@/sections/products/components/product-tab-toggle-button-group'
import { WithClassName } from '@/types/common'
import { cn } from '@/lib/utils'

type Props = WithClassName<{
  introductions?: string
  notes?: string
}>

function ProductInformation({ introductions, notes, className }: Props) {
  const { activeTab, handleTabButtonClick } = useProductInformation()

  const tabOptions = [
    { id: TABS.INTRODUCTIONS, label: '禮品介紹' },
    { id: TABS.NOTES, label: '注意事項' },
  ]

  return (
    <div className={cn(className)}>
      <div
        className={cn('setting-panel-frame', 'px-4 py-6 640:px-5 640:py-8 1440:px-28 1440:py-12')}
      >
        <Tabs
          defaultValue={activeTab}
          className="w-full flex flex-col gap-y-4 640:gap-y-8 1440:gap-y-12"
          value={activeTab}
        >
          <ProductTabToggleButtonGroup
            tabOptions={tabOptions}
            activeTab={activeTab}
            handleTabChange={handleTabButtonClick}
          />

          {/* 對應內容區塊 */}
          <TabsContent value={TABS.INTRODUCTIONS}>
            <ContentBlock content={introductions} />
          </TabsContent>
          <TabsContent value={TABS.NOTES}>
            <ContentBlock content={notes} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default memo(ProductInformation)
