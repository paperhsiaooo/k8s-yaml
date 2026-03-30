import { AuthGuard } from '@/auth/guard'
import { CompleteView } from '@/sections/products/children/product/children/complete/view'
import { JSX } from 'react'

type Props = {
  searchParams: Promise<{
    orderId: string
  }>
}

async function CompletePage({ searchParams }: Props): Promise<JSX.Element | null> {
  const { orderId } = await searchParams

  return (
    <AuthGuard>
      <CompleteView orderId={orderId} />
    </AuthGuard>
  )
}

export default CompletePage
