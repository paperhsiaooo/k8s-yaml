import { serverApiJson } from '@/utils/server-api-fetch'
import z from 'zod'

export const GetProductDetailResSchema = z.object({
  snapshotId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  type: z.string(),
  imageUrls: z.array(z.string()),
  details: z.string(),
  notes: z.string(),
  appCode: z.string(),
})

export type GetProductDetailResType = z.infer<typeof GetProductDetailResSchema>

// --------------------------------------------------------------------------

export const getProductDetail = async (productId: string): Promise<GetProductDetailResType> => {
  const url = `${process.env.BASE_URL}/api/public/v1/products/${productId}`

  try {
    const result = await serverApiJson<{ data: unknown }>(url)
    return GetProductDetailResSchema.parse(result.data)
  } catch (error) {
    console.error(`[getProductDetail] 獲取產品資料細節失敗：${error}`)
    throw error
  }
}
