import { DELIVERY_METHOD } from '@/constants/delivery-method'

/**
 * Given a delivery type key (e.g. "Home"), return the display name from DELIVERY_METHOD.
 */
export function getDeliveryMethodName(deliveryType?: string): string {
  if (!deliveryType) return '-'

  return Object.values(DELIVERY_METHOD).find((method) => method.Key === deliveryType)?.Name || '-'
}
