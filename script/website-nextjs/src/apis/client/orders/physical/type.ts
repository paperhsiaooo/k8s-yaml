import { z } from 'zod'

export const PhysicalPrefix = 'physical'

// ----------------------------------------------------------------------

export const GetPhysicalHistoryParamsSchema = z.object({
  status: z.string(),
})

export type GetPhysicalHistoryParamsType = z.infer<typeof GetPhysicalHistoryParamsSchema>

export const GetPhysicalHistoryResSchema = z.array(
  z.object({
    imageUrl: z.string(),
    name: z.string(),
    orderId: z.string(),
    quantity: z.number(),
    price: z.number(),
    deliveryMethod: z.string(),
    estimatedShipmentDate: z.number().nullable(),
    completedDate: z.number().nullable(),
  })
)

export type GetPhysicalHistoryResType = z.infer<typeof GetPhysicalHistoryResSchema>

export const GET_PHYSICAL_HISTORY_RES_DEFAULT: GetPhysicalHistoryResType = []
// ----------------------------------------------------------------------

export const GetPhysicalDetailParamsSchema = z.object({
  orderId: z.string(),
})

export type GetPhysicalDetailParamsType = z.infer<typeof GetPhysicalDetailParamsSchema>

export const GetPhysicalDetailResSchema = z.object({
  orderId: z.string(),
  quantity: z.number(),
  deliveryMethod: z.string(),
  status: z.string(),
  estimatedShipmentDate: z.number().nullable(),
  completedDate: z.number().nullable(),
  productName: z.string(),
  productDescription: z.string(),
  productPrice: z.number(),
  productImageUrl: z.string(),
  productId: z.number(),
  recipientName: z.string(),
  recipientMobilePhone: z.string(),
  recipientHomePhone: z.string().nullable(),
  recipientCountyId: z.number(),
  recipientDistrictId: z.number(),
  recipientDetailAddress: z.string(),
  note: z.string(),
  customerService: z.string(),
})

export type GetPhysicalDetailResType = z.infer<typeof GetPhysicalDetailResSchema>

export const GET_PHYSICAL_DETAIL_RES_DEFAULT: GetPhysicalDetailResType = {
  orderId: '',
  quantity: 0,
  deliveryMethod: '',
  status: '',
  estimatedShipmentDate: null,
  completedDate: null,
  productName: '',
  productDescription: '',
  productPrice: 0,
  productImageUrl: '',
  productId: 0,
  recipientName: '',
  recipientMobilePhone: '',
  recipientHomePhone: null,
  recipientCountyId: 0,
  recipientDistrictId: 0,
  recipientDetailAddress: '',
  note: '',
  customerService: '',
}
