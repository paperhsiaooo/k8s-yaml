import { z } from 'zod'

export const PhysicalPrefix = 'physical'

// ----------------------------------------------------------------------

export const PhysicalConfirmReqSchema = z.object({
  redeemHash: z.string(),
  customName: z.string(),
  customEmail: z.string(),
  customPhone: z.string(),
  customCityPhone: z.string().optional(),
  customCity: z.number(),
  customDistrict: z.number(),
  customAddress: z.string(),
  recipientName: z.string(),
  recipientPhone: z.string(),
  recipientCityPhone: z.string().optional(),
  recipientCity: z.number(),
  recipientDistrict: z.number(),
  recipientAddress: z.string(),
  deliveryMethod: z.string(),
})

export type PhysicalConfirmReqType = z.infer<typeof PhysicalConfirmReqSchema>

export const PhysicalConfirmResSchema = z.object({
  orderId: z.string(),
})

export type PhysicalConfirmResType = z.infer<typeof PhysicalConfirmResSchema>

// ----------------------------------------------------------------------
