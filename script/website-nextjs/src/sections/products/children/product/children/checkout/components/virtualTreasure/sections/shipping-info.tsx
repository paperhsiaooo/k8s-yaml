import { memo } from 'react'
import { AccountCard } from '../components/account-card'
import NoteBlock from '../../note-block'
import DeliveryGuide from '../../delivery-guide'
import { WithClassName } from '@/types/common'
import RewardBlock from '../../reward-block'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'

type AppAccount = {
  appCode: string
  appMemberId: string
  vip?: string | null
  level?: number | null
  nickName?: string | null
  avatarUrl?: string | null
}

type Props = WithClassName<{
  disabled?: boolean
  appAccounts: AppAccount[]
  imageUrl: string
  selectedUserId: string
  name: string
  price: number
  quantity: number
  notes: string
}>

function ShippingInfo({
  className = '',
  disabled = false,
  appAccounts = [],
  imageUrl = '',
  selectedUserId = '',
  name = '',
  price = 0,
  quantity = 0,
  notes = '',
}: Props) {
  return (
    <div className={className}>
      <div className="setting-panel-wrap">
        <div className="setting-panel-frame">
          <CategoryTitleBox>
            <CategoryTitle title="虛擬寶物" />
          </CategoryTitleBox>

          <div className="flex flex-col px-4 pb-4 640:px-6 640:pb-6 1440:px-[74px] 1440:pb-16">
            {/* 獎品清單表格 */}
            <RewardBlock
              imageUrl={imageUrl}
              name={name}
              quantity={quantity}
              price={price}
              className="mb-6"
            />

            {/* 寄送地址下方邊框 */}
            <DeliveryGuide className="mb-4 1440:mb-10">
              <p className="text-yile-500 mob-button-small 1440:web-button-small">
                禮品將以虛擬形式，寄送至您選擇的包你發綁定帳號信箱 :
              </p>
            </DeliveryGuide>

            {/* 包你發帳號選擇 */}
            <AccountCard.List className="mb-6">
              {appAccounts.map((account) => {
                const isSelected = account.appMemberId === selectedUserId

                return (
                  <AccountCard.Container
                    disabled={disabled}
                    key={account.appMemberId}
                    userId={account.appMemberId}
                    isSelected={isSelected}
                  >
                    <AccountCard.Content
                      userId={account.appMemberId}
                      imageUrl={account.avatarUrl}
                      nickname={account.nickName}
                      level={account.level}
                      vip={account.vip}
                    />
                  </AccountCard.Container>
                )
              })}
            </AccountCard.List>

            {/* 注意事項 */}
            <NoteBlock notes={notes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ShippingInfo)
