import useGetDetailAPI from '@/apis/client/orders/virtual-treasure/use-get-detail'
import { paths } from '@/routes/path'
import { useRouter } from 'next/navigation'

function useDetailView(orderId: string) {
  const router = useRouter()

  const { data: orderVirtualTreasureDetail, isLoading } = useGetDetailAPI(orderId)

  const handleBackToList = () => {
    router.push(
      paths.settings.children.redeem.children['virtual-treasure'].children.history.nva.path
    )
  }

  return {
    isLoading,
    orderVirtualTreasureDetail,
    handleBackToList,
  }
}

export default useDetailView
