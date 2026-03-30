import WrapperLayout from '@/app/layout/wrapper-layout'
import DetailView from '@/sections/settings/children/redeem/virtual-treasure/detail/views/detail-view'

type Props = {
  params: Promise<{
    orderId: string
  }>
}

async function RedeemVirtualTreasureDetailPage({ params }: Props) {
  const { orderId } = await params

  return (
    <WrapperLayout>
      <DetailView orderId={orderId} />
    </WrapperLayout>
  )
}

export default RedeemVirtualTreasureDetailPage
