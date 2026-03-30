'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm } from 'react-hook-form'
import { useCallback, useEffect } from 'react'
import { useMemberInfo } from '@/hooks/use-member-info'
import useMemberStore from '@/store/global/use-member'
import useGetMemberAppAccountAPI from '@/apis/client/members/use-get-member-app-account'
import useModifyMemberInformationAPI from '@/apis/client/members/use-modify-member-information'
import { ModifyMemberInformationReqType } from '@/apis/client/members/type'
import { toast } from 'sonner'
import { BaseSchemaType, formSchema } from '../schema/profile-schema'

function useProfile() {
  const { isPending: isPendingMemberInfo } = useMemberInfo(true)
  const { mutateAsync: modifyMemberInformation, isPending: isPendingModifyMemberInformation } =
    useModifyMemberInformationAPI()
  const { data: memberAppAccount, isPending: isPendingMemberAppAccount } =
    useGetMemberAppAccountAPI(true)
  const member = useMemberStore((state) => state.member)

  const methods = useReactHookForm<BaseSchemaType>({
    resolver: zodResolver(formSchema.baseSchema),
    defaultValues: formSchema.defaultValues,
  })

  const { handleSubmit, setValue, watch } = methods

  const city = watch('city')

  const onSubmit = useCallback(
    async (data: BaseSchemaType) => {
      const payload: ModifyMemberInformationReqType = {
        nickname: data.nickname,
        fullName: data.fullName,
        birthday: data.birthday === 0 ? null : data.birthday,
        gender: data.gender && data.gender !== '' ? data.gender : null,
        email: data.email,
        cityPhone: data.cityPhone ?? null,
        city: Number(data.city),
        district: Number(data.district),
        address: data.address,
      }

      await modifyMemberInformation(payload)

      toast.success('修改成功')
    },
    [modifyMemberInformation]
  )

  useEffect(() => {
    // 只有當 member 有值時，設置 form 值
    if (member.id !== '') {
      setValue('memberId', member.id)
      setValue('nickname', member.nickName)
      setValue('fullName', member.name)
      setValue('birthday', member.birthday)
      setValue('gender', member.gender)
      setValue('email', member.email)
      setValue('cityPhone', member.cityPhone ?? null)
      setValue('phone', member.phone)
      setValue('city', member.country === 0 ? '' : String(member.country))
      setValue('district', member.district === 0 ? '' : String(member.district))
      setValue('address', member.address)
    }
  }, [
    member.address,
    member.birthday,
    member.cityPhone,
    member.country,
    member.district,
    member.email,
    member.gender,
    member.id,
    member.name,
    member.nickName,
    member.phone,
    setValue,
  ])

  const handleCityChange = useCallback(
    (city: BaseSchemaType['city']) => {
      if (city) {
        setValue('city', city, { shouldValidate: true, shouldDirty: true })
        setValue('district', '', { shouldValidate: false, shouldDirty: false, shouldTouch: false })
      }
    },
    [setValue]
  )

  const handleDistrictChange = useCallback(
    (district: BaseSchemaType['district']) => {
      if (district) {
        setValue('district', district, { shouldValidate: true, shouldDirty: true })
      }
    },
    [setValue]
  )

  return {
    methods,
    city,
    isPendingModifyMemberInformation,
    memberAppAccount: memberAppAccount.map((item) => ({
      avatarUrl: item.avatarUrl,
      nickname: item.nickName,
      appMemberId: item.appMemberId,
      level: item.level,
      vip: item.vip,
    })),
    isPendingMemberInfo,
    isPendingMemberAppAccount,
    handleCityChange,
    handleDistrictChange,
    handleSubmit,
    onSubmit,
  }
}

export default useProfile
