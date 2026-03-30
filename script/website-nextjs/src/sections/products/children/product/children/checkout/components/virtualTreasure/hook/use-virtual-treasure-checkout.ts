import { useForm as useReactHookForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo, useTransition } from 'react'
import { VirtualTreasureConfirmReqType } from '@/apis/client/redeem/virtualTreasure/type'
import { useRouter } from 'next/navigation'
import useVirtualTreasureConfirmAPI from '@/apis/client/redeem/virtualTreasure/use-confirm'
import { paths } from '@/routes/path'
import useGetProductAppAccountsAPI from '@/apis/client/products/use-get-app-accounts'
import useModifyMemberInformationAPI from '@/apis/client/members/use-modify-member-information'
import { ModifyMemberInformationReqType } from '@/apis/client/members/type'
import { BaseSchemaType, formSchema } from '../schema/virtual-treasure-checkout-schema'
import useGetMemberInformationAPI from '@/apis/client/members/use-get-member-information'

type Props = {
  productId: string
  redeemHash: string
  appCode: string
}

function useVirtualTreasureCheckout({ productId, redeemHash }: Props) {
  const router = useRouter()
  const { data: memberInformation, isFetched: isFetchedMemberInformation } =
    useGetMemberInformationAPI(true)
  const { data: appAccounts } = useGetProductAppAccountsAPI(redeemHash)

  const methods = useReactHookForm<BaseSchemaType>({
    resolver: zodResolver(formSchema.baseSchema),
    defaultValues: formSchema.defaultValues,
  })
  const {
    formState: { isSubmitting, isLoading },
    handleSubmit,
    watch,
    setValue,
  } = methods

  const {
    mutateAsync: virtualTreasureConfirmMutateAsync,
    isPending: isPendingVirtualTreasureConfirmAPI,
  } = useVirtualTreasureConfirmAPI()

  const {
    mutateAsync: modifyMemberInformationMutateAsync,
    isPending: isPendingModifyMemberInformationAPI,
  } = useModifyMemberInformationAPI()

  const [isPending, startTransition] = useTransition()

  const customCity = watch('customCity')

  const disabledSubmitButton = useMemo(
    () =>
      isSubmitting ||
      isLoading ||
      isPending ||
      isPendingVirtualTreasureConfirmAPI ||
      isPendingModifyMemberInformationAPI,
    [
      isSubmitting,
      isLoading,
      isPending,
      isPendingVirtualTreasureConfirmAPI,
      isPendingModifyMemberInformationAPI,
    ]
  )

  const onSubmit = useCallback(
    async (data: BaseSchemaType) => {
      if (disabledSubmitButton) return

      try {
        const payload: VirtualTreasureConfirmReqType = {
          redeemHash,
          customName: data.customName,
          customEmail: data.customEmail,
          customPhone: data.customPhone,
          customCityPhone: data.customCityPhone,
          customCity: Number(data.customCity),
          customDistrict: Number(data.customDistrict),
          customAddress: data.customAddress,
          userId: data.userId,
        }

        const modifyMemberInformationPayload: ModifyMemberInformationReqType = {
          nickname: null,
          cityPhone: data.customCityPhone ?? null,
          email: data.customEmail,
          fullName: data.customName,
          birthday: null,
          gender: null,
          city: Number(data.customCity),
          district: Number(data.customDistrict),
          address: data.customAddress,
        }

        const res = await virtualTreasureConfirmMutateAsync(payload)
        await modifyMemberInformationMutateAsync(modifyMemberInformationPayload)
        const { orderId } = res

        startTransition(() => {
          router.push(`${paths.products.root}/${productId}/complete?orderId=${orderId}`)
        })
      } catch {
        router.push(paths.root)
      }
    },
    [
      productId,
      redeemHash,
      disabledSubmitButton,
      router,
      virtualTreasureConfirmMutateAsync,
      modifyMemberInformationMutateAsync,
    ]
  )

  const onAutoFillCustomMemberInfo = useCallback(
    (
      cityPhone: string,
      name: string,
      phone: string,
      email: string,
      country: number,
      district: number,
      address: string
    ) => {
      setValue('customName', name)
      setValue('customPhone', phone)
      setValue('customEmail', email)
      setValue('customCityPhone', cityPhone ?? null)
      setValue('customCity', country === 0 ? '' : String(country))
      setValue('customDistrict', district === 0 ? '' : String(district))
      setValue('customAddress', address)
    },
    [setValue]
  )

  const handleCustomCityChange = useCallback(
    (city: BaseSchemaType['customCity']) => {
      if (city) {
        setValue('customCity', city, { shouldValidate: true, shouldDirty: true })
        setValue('customDistrict', '', {
          shouldValidate: false,
          shouldDirty: false,
          shouldTouch: false,
        })
      }
    },
    [setValue]
  )

  const handleCustomDistrictChange = useCallback(
    (district: BaseSchemaType['customDistrict']) => {
      if (district) {
        setValue('customDistrict', district, { shouldValidate: true, shouldDirty: true })
      }
    },
    [setValue]
  )

  useEffect(() => {
    if (isFetchedMemberInformation) {
      onAutoFillCustomMemberInfo(
        memberInformation?.cityPhone ?? '',
        memberInformation?.name ?? '',
        memberInformation?.phone ?? '',
        memberInformation?.email ?? '',
        memberInformation?.country ?? 0,
        memberInformation?.district ?? 0,
        memberInformation?.address ?? ''
      )
    }
  }, [
    isFetchedMemberInformation,
    memberInformation?.address,
    memberInformation?.cityPhone,
    memberInformation?.country,
    memberInformation?.district,
    memberInformation?.email,
    memberInformation?.name,
    memberInformation?.phone,
    onAutoFillCustomMemberInfo,
  ])

  return {
    methods,
    customCity,
    appAccounts,
    disabledSubmitButton,
    selectedUserId: watch('userId'),
    handleCustomCityChange,
    handleCustomDistrictChange,
    handleSubmit,
    onSubmit,
  }
}

export default useVirtualTreasureCheckout
