import { z } from 'zod'

export const ProductsPrefix = 'products'

// ----------------------------------------------------------------------

export const ProductsAppAccountsResSchema = z.array(
  z.object({
    appCode: z.string(),
    appMemberId: z.string(),
    vip: z.string().nullable(),
    level: z.number().nullable(),
    nickName: z.string().nullable(),
    avatarUrl: z.string().nullable(),
  })
)

export type ProductsAppAccountsResType = z.infer<typeof ProductsAppAccountsResSchema>

export const GET_PRODUCTS_APP_ACCOUNTS_RES_DEFAULT: ProductsAppAccountsResType = []
