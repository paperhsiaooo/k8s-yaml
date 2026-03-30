import z from 'zod'

export const OrdersPrefix = 'orders'

export const GetOrderDetailResSchema = z.object({
  type: z.string(),
  orderId: z.string(),
  physicalData: z
    .object({
      product: z.object({
        name: z.string(),
        price: z.number(),
        description: z.string(),
        quantity: z.number(),
        imageUrl: z.string(),
      }),
      deliveryType: z.string(),
      recipientName: z.string(),
      recipientPhone: z.string(),
      recipientCityPhone: z.string(),
      recipientCountyId: z.number(),
      recipientDistrictId: z.number(),
      recipientDetailAddress: z.string(),
      note: z.string(),
      createTime: z.number(),
    })
    .nullable(),
  virtualData: z.object({}).nullable(),
  virtualTreasureData: z
    .object({
      product: z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        imageUrl: z.string(),
        description: z.string(),
      }),
      nickName: z.string(),
      userId: z.string(),
      note: z.string(),
    })
    .nullable(),
})

export type GetOrderDetailResType = z.infer<typeof GetOrderDetailResSchema>

export const GET_ORDER_DETAIL_RES_DEFAULT: GetOrderDetailResType = {
  type: '',
  orderId: '',
  physicalData: {
    product: {
      name: '',
      price: 0,
      quantity: 0,
      imageUrl: '',
      description: '',
    },
    deliveryType: '',
    recipientName: '',
    recipientPhone: '',
    recipientCityPhone: '',
    recipientCountyId: 0,
    recipientDistrictId: 0,
    recipientDetailAddress: '',
    note: '',
    createTime: 0,
  },
  virtualData: {},
  virtualTreasureData: {
    product: {
      name: '',
      price: 0,
      quantity: 0,
      imageUrl: '',
      description: '',
    },
    nickName: '',
    userId: '',
    note: '',
  },
}
