'use client'

import { useEffect, useState } from 'react'
import useAuthGuard from '../hooks/use-auth-guard'
import { useRouter } from 'next/navigation'
import { paths } from '@/routes/path'
import Loading from '@/components/custom/loading'

type Props = {
  children: React.ReactNode
}

export function AuthGuard({ children }: Props) {
  const router = useRouter()
  const { authenticated, loading } = useAuthGuard()
  const [isChecking, setIsChecking] = useState<boolean>(true)

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return
    }

    if (!authenticated) {
      console.log('沒有權限！跳出 Login Modal')
      router.push(paths.root)
      return
    }

    setIsChecking(false)
  }

  useEffect(() => {
    checkPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, authenticated])

  if (isChecking) {
    return <Loading className="bg-yile-100" />
  }

  return children
}
