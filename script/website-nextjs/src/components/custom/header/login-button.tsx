'use client'

import { AiOutlineUser } from 'react-icons/ai'
import { memo, useCallback } from 'react'
import IconPoint from '../icons/icon-point'
import useMemberStore from '@/store/global/use-member'
import SyncButton from '../button/sync-button'
import { usePointBalance } from '@/hooks/use-point-balance'

type Props = {
  isLogin: boolean
  point: number | undefined
}

function LoginButton({ isLogin, point }: Props) {
  const member = useMemberStore((state) => state.member)
  const { refreshPoint: refreshPointBalanceAPI } = usePointBalance()

  const handleSync = useCallback(() => {
    refreshPointBalanceAPI()
  }, [refreshPointBalanceAPI])

  return (
    <div className="flex flex-row items-stretch h-16 1440:h-[85px]">
      <div className="bg-yile-500 w-16 h-full flex items-center justify-center 1440:w-[85px]">
        <AiOutlineUser className="text-white text-2xl xl:text-4xl" />
      </div>
      {isLogin && (
        <div className="pl-2 flex flex-col justify-center items-start gap-y-1 1440:pl-4 1440:gap-y-2">
          <p className="text-yile-950 1440:web-menu-bold">{`${member.id}`}</p>
          <div className="flex flex-row items-center gap-x-1">
            <IconPoint className="w-4 1440:w-5" />
            <p className="text-yile-900 1440:web-em-bold 1440:text-[22px]">{point}點</p>
            <SyncButton onClick={handleSync} />
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(LoginButton)
