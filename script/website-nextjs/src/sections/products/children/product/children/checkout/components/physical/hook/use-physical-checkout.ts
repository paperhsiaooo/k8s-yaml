import { useForm as useReactHookForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo, useTransition } from 'react'
import usePhysicalConfirmAPI from '@/apis/client/redeem/physical/use-confirm'
import { PhysicalConfirmReqType } from '@/apis/client/redeem/physical/type'
import { useRouter } from 'next/navigation'
import { paths } from '@/routes/path'
import useModifyMemberInformationAPI from '@/apis/client/members/use-modify-member-information'
import { ModifyMemberInformationReqType } from '@/apis/client/members/type'
import { formSchema, BaseSchemaType } from '../schema/physical-checkout-schema'
import useGetMemberInformationAPI from '@/apis/client/members/use-get-member-information'

type Props = {
  productId: string
  redeemHash: string
}

function usePhysicalCheckout({ productId, redeemHash }: Props) {
  const router = useRouter()
  const { data: memberInformation, isFetched: isFetchedMemberInformation } =
    useGetMemberInformationAPI(true)

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

  const { mutateAsync: physicalConfirmMutateAsync, isPending: isPendingPhysicalConfirmAPI } =
    usePhysicalConfirmAPI()

  const {
    mutateAsync: modifyMemberInformationMutateAsync,
    isPending: isPendingModifyMemberInformationAPI,
  } = useModifyMemberInformationAPI()

  const customName = watch('customName')
  const customPhone = watch('customPhone')
  const customCityPhone = watch('customCityPhone')
  const customCity = watch('customCity')
  const customDistrict = watch('customDistrict')
  const customAddress = watch('customAddress')
  const recipientCity = watch('recipientCity')

  const [isPending, startTransition] = useTransition()

  const disabledSubmitButton = useMemo(
    () =>
      isSubmitting ||
      isLoading ||
      isPending ||
      isPendingPhysicalConfirmAPI ||
      isPendingModifyMemberInformationAPI,
    [
      isSubmitting,
      isLoading,
      isPending,
      isPendingPhysicalConfirmAPI,
      isPendingModifyMemberInformationAPI,
    ]
  )

  const onSubmit = useCallback(
    async (data: BaseSchemaType) => {
      try {
        if (disabledSubmitButton) return

        const payload: PhysicalConfirmReqType = {
          redeemHash,
          customName: data.customName,
          customEmail: data.customEmail,
          customPhone: data.customPhone,
          customCityPhone: data.customCityPhone,
          customCity: Number(data.customCity),
          customDistrict: Number(data.customDistrict),
          customAddress: data.customAddress,
          recipientName: data.recipientName,
          recipientPhone: data.recipientPhone,
          recipientCityPhone: data.recipientCityPhone,
          recipientCity: Number(data.recipientCity),
          recipientDistrict: Number(data.recipientDistrict),
          recipientAddress: data.recipientAddress,
          deliveryMethod: data.deliveryMethod,
        }

        const modifyMemberInformationPayload: ModifyMemberInformationReqType = {
          nickname: null,
          email: data.customEmail,
          fullName: data.customName,
          birthday: null,
          gender: null,
          cityPhone: data.customCityPhone ?? null,
          city: Number(data.customCity),
          district: Number(data.customDistrict),
          address: data.customAddress,
        }

        const res = await physicalConfirmMutateAsync(payload)
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
      redeemHash,
      productId,
      disabledSubmitButton,
      router,
      physicalConfirmMutateAsync,
      modifyMemberInformationMutateAsync,
    ]
  )

  const onAutoFillCustomMemberInfo = useCallback(
    (
      name: string,
      phone: string,
      cityPhone: string,
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

  const onAutoFillRecipientMemberInfo = useCallback(() => {
    setValue('recipientName', customName)
    setValue('recipientPhone', customPhone)
    setValue('recipientCityPhone', customCityPhone)
    setValue('recipientCity', customCity)
    setValue('recipientDistrict', customDistrict)
    setValue('recipientAddress', customAddress)
  }, [
    customAddress,
    customCity,
    customCityPhone,
    customDistrict,
    customName,
    customPhone,
    setValue,
  ])

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

  const handleRecipientCityChange = useCallback(
    (city: BaseSchemaType['recipientCity']) => {
      if (city) {
        setValue('recipientCity', city, { shouldValidate: true, shouldDirty: true })
        setValue('recipientDistrict', '', {
          shouldValidate: false,
          shouldDirty: false,
          shouldTouch: false,
        })
      }
    },
    [setValue]
  )

  const handleRecipientDistrictChange = useCallback(
    (district: BaseSchemaType['recipientDistrict']) => {
      if (district) {
        setValue('recipientDistrict', district, { shouldValidate: true, shouldDirty: true })
      }
    },
    [setValue]
  )

  const handleShippingAutoFillCustomMemberInfoChange = useCallback(() => {
    onAutoFillRecipientMemberInfo()
  }, [onAutoFillRecipientMemberInfo])

  useEffect(() => {
    if (isFetchedMemberInformation) {
      onAutoFillCustomMemberInfo(
        memberInformation?.name ?? '',
        memberInformation?.phone ?? '',
        memberInformation?.cityPhone ?? '',
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
    recipientCity,
    disabledSubmitButton,
    handleCustomCityChange,
    handleCustomDistrictChange,
    handleRecipientCityChange,
    handleRecipientDistrictChange,
    handleShippingAutoFillCustomMemberInfoChange,
    handleSubmit,
    onSubmit,
  }
}

export default usePhysicalCheckout
