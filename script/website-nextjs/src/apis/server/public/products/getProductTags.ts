import { serverApiJson } from '@/utils/server-api-fetch'
import z from 'zod'

export const GetProductTagsResSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
)

export type GetProductTagsResType = z.infer<typeof GetProductTagsResSchema>

// --------------------------------------------------------------------------

export const getProductTags = async (): Promise<GetProductTagsResType> => {
  const url = `${process.env.BASE_URL}/api/public/v1/products/tags`

  try {
    const result = await serverApiJson<{ data: unknown }>(url)
    return GetProductTagsResSchema.parse(result.data)
  } catch (error) {
    console.error(`[getProductTags] 獲取產品 tags 失敗：`, error)
    throw error
  }
}
