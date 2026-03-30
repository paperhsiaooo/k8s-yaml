import { z } from 'zod'

export const PointsPrefix = 'points'

export const GetPointsParamsSchema = z.object({
  memberId: z.string(),
})

export type GetPointsParamsType = z.infer<typeof GetPointsParamsSchema>

export const GetPointsResSchema = z.object({
  currentBalance: z.number(),
})

export type GetPointsResType = z.infer<typeof GetPointsResSchema>

export const GET_POINTS_RES_DEFAULT: GetPointsResType = {
  currentBalance: 0,
}

// ----------------------------------------------------------------------

export type GetPointsHistoryParamsType = {
  startTime: string
  endTime: string
  type: string
  page: number
  limit: number
}

export const PointsHistoryItemSchema = z.object({
  type: z.string(),
  pointsChange: z.number(),
  source: z.string(),
  createTime: z.number(),
})

export type PointsHistoryItemType = z.infer<typeof PointsHistoryItemSchema>

export const GetPointsHistoryResSchema = z.object({
  list: z.array(PointsHistoryItemSchema),
  total: z.number(),
})

export type GetPointsHistoryResType = z.infer<typeof GetPointsHistoryResSchema>

export const GET_POINTS_HISTORY_RES_DEFAULT: GetPointsHistoryResType = {
  list: [],
  total: 0,
}
