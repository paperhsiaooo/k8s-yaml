import { z } from 'zod'

export const VirtualTreasurePrefix = 'virtualTreasure'

// ----------------------------------------------------------------------

export const GetVirtualTreasureHistoryResSchema = z.array(
  z.object({
    orderId: z.string(),
    userId: z.string(),
    nickname: z.string(),
    productName: z.string(),
    quantity: z.number(),
    price: z.number(),
    imageUrl: z.string(),
    createTime: z.number(),
    status: z.string(),
  })
)

export type GetVirtualTreasureHistoryResType = z.infer<typeof GetVirtualTreasureHistoryResSchema>

export const GET_VIRTUAL_TREASURE_HISTORY_RES_DEFAULT: GetVirtualTreasureHistoryResType = []

// ----------------------------------------------------------------------

export const GetVirtualTreasureDetailResSchema = z.object({
  orderId: z.string(),
  userId: z.string(),
  nickname: z.string(),
  productName: z.string(),
  quantity: z.number(),
  price: z.number(),
  imageUrl: z.string(),
  description: z.string(),
  createTime: z.number(),
  note: z.string(),
  customerService: z.string(),
})

export type GetVirtualTreasureDetailResType = z.infer<typeof GetVirtualTreasureDetailResSchema>

export const GET_VIRTUAL_TREASURE_DETAIL_RES_DEFAULT: GetVirtualTreasureDetailResType = {
  orderId: '',
  userId: '',
  nickname: '',
  productName: '',
  quantity: 0,
  price: 0,
  imageUrl: '',
  description: '',
  createTime: 0,
  note: '',
  customerService: '',
}
