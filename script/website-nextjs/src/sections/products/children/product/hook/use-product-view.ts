import { useForm as useReactHookForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCallback, useEffect, useMemo, useTransition } from 'react'
import useInitiateAPI from '@/apis/client/redeem/use-initate'
import { RedeemInitiateReqType } from '@/apis/client/redeem/type'
import { useRouter } from 'next/navigation'
import { QUANTITY_SELECT_MAX } from '../constants/constants'
import { paths } from '@/routes/path'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { usePointBalance } from '@/hooks/use-point-balance'
import { BaseSchemaType, formSchema } from '../schema/product-view-schema'
import status from 'http-status'

// ----------------------------------------------------------------------

function useProductView(productId: string, snapshotId: string) {
  const router = useRouter()
  const { refreshPoint } = usePointBalance()
  const [isPending, startTransition] = useTransition()

  const methods = useReactHookForm<BaseSchemaType>({
    resolver: zodResolver(formSchema.baseSchema),
    defaultValues: formSchema.defaultValues,
  })

  const {
    handleSubmit,
    formState: { isLoading, isSubmitting },
  } = methods

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInitiateError = useCallback((error: any) => {
    const errorData = error as AxiosError

    if (errorData.response?.status === status.UNAUTHORIZED) {
      toast.error('請先登入帳號')
    }
  }, [])

  const { mutateAsync, isPending: apiIsPending } = useInitiateAPI(onInitiateError)

  const disabledButton = useMemo(() => {
    return isLoading || isSubmitting || isPending || apiIsPending
  }, [isLoading, isSubmitting, isPending, apiIsPending])

  const onSubmit = useCallback(
    async (data: BaseSchemaType) => {
      const payload: RedeemInitiateReqType = {
        productId: Number(productId),
        snapshotId,
        quantity: Number(data.quantity),
      }

      const res = await mutateAsync(payload)

      startTransition(() => {
        router.push(
          `${paths.products.root}/${productId}/checkout?redeemHash=${res.redeemHash}&quantity=${payload.quantity}`
        )
      })
    },
    [mutateAsync, productId, router, snapshotId]
  )

  const quantitySelectOptions = useMemo(() => {
    return Array.from({ length: QUANTITY_SELECT_MAX }, (_, index) => ({
      label: `${index + 1}`,
      value: `${index + 1}`,
    }))
  }, [])

  useEffect(() => {
    refreshPoint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    quantitySelectOptions,
    methods,
    disabledButton,
    handleSubmit,
    onSubmit,
  }
}

export default useProductView
