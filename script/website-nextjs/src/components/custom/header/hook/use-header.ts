import { GetPointsResType } from '@/apis/client/points/type'
import useGetPointAPI from '@/apis/client/points/use-get-point'
import useAuthStore, { Auth } from '@/store/global/use-auth'
import useMemberStore from '@/store/global/use-member'

function useHeader(): {
  point: GetPointsResType | undefined
  auth: Auth
} {
  const auth = useAuthStore((state) => state.auth)
  const member = useMemberStore((state) => state.member)
  const { data: point } = useGetPointAPI({ memberId: member.id })

  return {
    point,
    auth,
  }
}

export default useHeader
