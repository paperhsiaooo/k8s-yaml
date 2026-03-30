import WrapperLayout from '@/app/layout/wrapper-layout'
import ShipmentTrackingDetailView from '@/sections/settings/children/shipment-tracking/children/detail/views/detail-view'

type Props = {
  params: Promise<{
    orderId: string
  }>
}

async function ShipmentTrackingDetailPage({ params }: Props) {
  const { orderId } = await params

  return (
    <WrapperLayout>
      <ShipmentTrackingDetailView orderId={orderId} />
    </WrapperLayout>
  )
}

export default ShipmentTrackingDetailPage
