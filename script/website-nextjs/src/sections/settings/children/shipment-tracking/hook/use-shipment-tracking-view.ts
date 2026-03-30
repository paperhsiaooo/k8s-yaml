import { parseAsString, useQueryState } from 'nuqs'
import { SHIPMENT_STATUS } from '@/constants/shipment-status'
import useGetHistoryAPI from '@/apis/client/orders/physical/use-get-history'
import { GetPhysicalHistoryParamsType } from '@/apis/client/orders/physical/type'

function useShipmentTrackingView() {
  const [status, setStatus] = useQueryState<GetPhysicalHistoryParamsType['status']>(
    'status',
    parseAsString.withDefault(SHIPMENT_STATUS.PENDING.code)
  )

  const { data: shipmentTrackingList, isLoading, error } = useGetHistoryAPI({ status })

  const handleToggleButtonChange = (value: string) => {
    setStatus(value)
  }

  return {
    status,
    shipmentTrackingList,
    isLoading,
    error,
    handleToggleButtonChange,
  }
}

export default useShipmentTrackingView
