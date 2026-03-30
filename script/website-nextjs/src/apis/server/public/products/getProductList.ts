import { serverApiJson } from '@/utils/server-api-fetch'
import z from 'zod'

export const GetProductListResSchema = z.array(
  z.object({
    productId: z.number(),
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    imageUrl: z.string(),
  })
)

export type GetProductListResType = z.infer<typeof GetProductListResSchema>

// --------------------------------------------------------------------------

type GetProductListPayload = {
  tag: string | null
  limit: number | null
}

export const getProductList = async (
  payload: GetProductListPayload | null
): Promise<GetProductListResType> => {
  const params = new URLSearchParams()

  if (payload?.tag) {
    params.set('tag', payload.tag)
  }

  if (payload?.limit) {
    params.set('limit', payload.limit.toString())
  }

  const queryString = params.toString()

  const url = `${process.env.BASE_URL}/api/public/v1/products?${queryString}`

  try {
    const result = await serverApiJson<{ data: unknown }>(url)
    return GetProductListResSchema.parse(result.data)
  } catch (error) {
    console.error(`[getProductList] 獲取產品列表失敗：`, error)
    throw error
  }
}
