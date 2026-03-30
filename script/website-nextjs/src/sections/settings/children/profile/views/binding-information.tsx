import { memo, useMemo } from 'react'
import { AccountCard } from '@/sections/products/children/product/children/checkout/components/virtualTreasure/components/account-card'
import NoBindingCard from '../components/no-binding-card'

export type BindingData = {
  appMemberId: string
  avatarUrl: string | null
  nickname: string | null
  level: number | null
  vip: string | null
}

type Props = {
  list?: BindingData[]
}

function BindingInformation({ list = [] }: Props) {
  const renderAccountList = useMemo(() => {
    if (list.length === 0) {
      return <NoBindingCard label="尚未綁定包你發帳號" />
    }

    return (
      <AccountCard.List>
        {list.map((bindingData) => {
          return (
            <div
              key={bindingData.appMemberId}
              className="bg-yile-100 px-2.5 py-5 rounded-[20px] 640:rounded-full 640:p-5"
            >
              <AccountCard.Content
                userId={bindingData.appMemberId}
                imageUrl={bindingData.avatarUrl}
                nickname={bindingData.nickname}
                level={bindingData.level}
                vip={bindingData.vip}
              />
            </div>
          )
        })}
      </AccountCard.List>
    )
  }, [list])

  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="px-2.5 py-6 640:px-5 640:py-6 1440:p-[30px] bg-yile-50">
        <div className="mb-4">
          <h2 className="mob-h3-bold">包你發帳號綁定資料</h2>
          <p className="text-red-1 mob-text-bold-01">※ 每組發點帳號，最多可綁定 5 個包你發帳號。</p>
        </div>

        {renderAccountList}
      </div>
    </div>
  )
}

export default memo(BindingInformation)
