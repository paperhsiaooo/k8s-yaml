import useGetDetailAPI from '@/apis/client/orders/physical/use-get-detail'
import { paths } from '@/routes/path'
import { useRouter } from 'next/navigation'

type Props = {
  orderId: string
}

function useDetailView({ orderId }: Props) {
  const router = useRouter()

  const { data: orderPhysicalDetail, isLoading } = useGetDetailAPI({ orderId })

  const handleBackToList = () => {
    router.push(paths.settings.children['shipment-tracking'].nav.path)
  }

  return {
    orderPhysicalDetail,
    isLoading,
    handleBackToList,
  }
}

export default useDetailView
