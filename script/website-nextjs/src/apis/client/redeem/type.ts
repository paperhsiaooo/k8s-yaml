import { z } from 'zod'

export const RedeemPrefix = 'redeem'

// ----------------------------------------------------------------------

export const InitiateReqSchema = z.object({
  productId: z.number(),
  snapshotId: z.string(),
  quantity: z.number(),
})

export type RedeemInitiateReqType = z.infer<typeof InitiateReqSchema>

export const InitiateResSchema = z.object({
  redeemHash: z.string(),
})

export type RedeemInitiateResType = z.infer<typeof InitiateResSchema>

// ----------------------------------------------------------------------
