import { PointsPrefix } from '@/apis/client/points/type'
import useGetPointAPI from '@/apis/client/points/use-get-point'
import useMemberStore from '@/store/global/use-member'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export function usePointBalance() {
  const memberId = useMemberStore((state) => state.member.id)
  const queryClient = useQueryClient()
  const query = useGetPointAPI({ memberId })

  const refreshPoint = useCallback(() => {
    if (!memberId) return

    return queryClient.invalidateQueries({ queryKey: [`${PointsPrefix}/point`, { memberId }] })
  }, [queryClient, memberId])

  return { refreshPoint, ...query }
}
