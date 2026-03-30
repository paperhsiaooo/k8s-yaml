import { useQuery } from '@tanstack/react-query'

import axios from '@/utils/axios'
import {
  ProductsPrefix,
  ProductsAppAccountsResSchema,
  ProductsAppAccountsResType,
  GET_PRODUCTS_APP_ACCOUNTS_RES_DEFAULT,
} from './type'

const cacheKey = 'getProductAppAccounts'

async function getProductAppAccountsAPI(
  redeemHash: string,
  showToastOnError: boolean
): Promise<ProductsAppAccountsResType> {
  try {
    const res = await axios.get(
      `/private/v1/${ProductsPrefix}/appAccounts?redeemHash=${redeemHash}`,
      {
        _showToastOnError: showToastOnError,
      }
    )

    return ProductsAppAccountsResSchema.parse(res)
  } catch (error) {
    throw error
  }
}

function useGetProductAppAccountsAPI(redeemHash: string, options?: { showToastOnError?: boolean }) {
  const { showToastOnError = true } = options || {}
  return useQuery({
    queryKey: [`${ProductsPrefix}/${cacheKey}`, redeemHash],
    queryFn: () => getProductAppAccountsAPI(redeemHash, showToastOnError),
    enabled: !!redeemHash,
    initialData: GET_PRODUCTS_APP_ACCOUNTS_RES_DEFAULT,
  })
}

export default useGetProductAppAccountsAPI
