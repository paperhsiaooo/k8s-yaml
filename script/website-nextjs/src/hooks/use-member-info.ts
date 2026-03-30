import useGetMemberInformationAPI from '@/apis/client/members/use-get-member-information'
import useAuthStore from '@/store/global/use-auth'
import useMemberStore from '@/store/global/use-member'
import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMemberInfo(params: any, options?: { showToastOnError?: boolean }) {
  const {
    data: memberInformation,
    isPending,
    isFetching,
    error,
  } = useGetMemberInformationAPI(params, options)
  const setMember = useMemberStore((state) => state.setMember)
  const setIsLogin = useAuthStore((state) => state.setIsLogin)

  useEffect(() => {
    if (memberInformation) {
      setMember({
        id: memberInformation.memberId,
        nickName: memberInformation.nickName,
        name: memberInformation.name,
        phone: memberInformation.phone,
        cityPhone: memberInformation.cityPhone,
        email: memberInformation.email,
        birthday: memberInformation.birthday,
        gender: memberInformation.gender,
        country: memberInformation.country,
        district: memberInformation.district,
        address: memberInformation.address,
      })

      setIsLogin(true)
    }
  }, [memberInformation, setIsLogin, setMember])

  return {
    isPending: params && (isPending || isFetching),
    error,
  }
}
