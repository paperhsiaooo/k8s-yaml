import { z } from 'zod'

export const VirtualTreasurePrefix = 'virtualTreasure'

// ----------------------------------------------------------------------

export const VirtualTreasureConfirmReqSchema = z.object({
  redeemHash: z.string(),
  customName: z.string(),
  customEmail: z.string(),
  customPhone: z.string(),
  customCityPhone: z.string().optional(),
  customCity: z.number(),
  customDistrict: z.number(),
  customAddress: z.string(),
  userId: z.string(),
})

export type VirtualTreasureConfirmReqType = z.infer<typeof VirtualTreasureConfirmReqSchema>

export const VirtualTreasureConfirmResSchema = z.object({
  orderId: z.string(),
})

export type VirtualTreasureConfirmResType = z.infer<typeof VirtualTreasureConfirmResSchema>

// ----------------------------------------------------------------------
