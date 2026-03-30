export type ProductInfo = {
  name: string
  price: number
  quantity: number
  imageUrl: string | null
  description: string | null
}

export type DeliveryInfo = {
  orderId: string
  products: ProductInfo[]
  recipientName: string
  recipientPhone: string
  recipientCityPhone: string
  recipientAddress: string
  deliveryMethod: string
  note: string
  createTime: number
}
