'use client'

import ShipmentToggleButtonGroup from '../components/shipment-toggle-button-group'
import useShipmentTrackingView from '../hook/use-shipment-tracking-view'
import ShipmentContainer from '../components/shipment-container'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'

function ShipmentTrackingView() {
  const { shipmentTrackingList, status, handleToggleButtonChange } = useShipmentTrackingView()

  return (
    <div className="setting-panel-wrap">
      <div className="setting-panel-frame">
        <CategoryTitleBox>
          <CategoryTitle title="實體好禮出貨查詢" />
        </CategoryTitleBox>

        <ShipmentToggleButtonGroup
          className="mb-4 640:mb-5 1440:mb-9"
          curStatus={status}
          onButtonChange={handleToggleButtonChange}
        />
        <ShipmentContainer historyList={shipmentTrackingList} />
      </div>
    </div>
  )
}

export default ShipmentTrackingView
