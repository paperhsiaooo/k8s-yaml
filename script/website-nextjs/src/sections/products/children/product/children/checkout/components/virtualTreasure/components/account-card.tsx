'use client'

import RHFRadioButton from '@/components/custom/hook-form/rhf-radio-button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import AsyncImage from '@/components/custom/image/asyncImage'
import { JSX, memo } from 'react'

type AccountListProps = WithClassName<{
  children: React.ReactNode
}>

function AccountList({ children, className }: AccountListProps) {
  return <div className={cn('flex flex-col gap-y-2 640:gap-y-2.5', className)}>{children}</div>
}

type AccountCardContainerProps = {
  userId: string
  children: React.ReactNode
  isSelected?: boolean
  disabled?: boolean
}

function AccountCardContainer({
  userId,
  isSelected,
  children,
  disabled = false,
}: AccountCardContainerProps) {
  return (
    <Label
      htmlFor={userId}
      className={cn(
        'bg-yile-50 rounded-[20px] 1440:rounded-full cursor-pointer',
        isSelected && '[background-image:var(--color-gradient-10)]'
      )}
    >
      <div className="flex flex-row items-center gap-x-3 p-3 w-full sm:p-4 lg:px-6 lg:gap-x-4">
        <RHFRadioButton
          id={userId}
          name="userId"
          value={userId}
          disabled={disabled}
          className="w-5 before:bg-green-2 border-gray sm:w-6"
        />
        {children}
      </div>
    </Label>
  )
}

type AccountCardContentProps = {
  userId: string
  imageUrl?: string | null
  nickname?: string | null
  level?: number | null
  vip?: string | null
}

function AccountCardContent({
  userId = '',
  imageUrl = '',
  nickname = '',
  level = 0,
  vip = '',
}: AccountCardContentProps): JSX.Element {
  return (
    <div id={userId} className="flex flex-row items-center gap-x-3 flex-1 1440:gap-x-5">
      <div className="relative w-[70px] aspect-square overflow-hidden rounded-full border-white border-1 1440:w-[100px]">
        <AsyncImage mode="cdn" src={imageUrl || ''} alt="account" fill />
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="text-yile-950 mob-button-small 1440:web-button-small">{nickname}</p>
        <p className="text-black-1 mob-text hidden 640:block 1440:text-text">{`會員ID：${userId}｜卡別：${vip}｜帳號等級：${level}`}</p>
        <div className="640:hidden">
          <p className="mob-text">{`會員ID：${userId}`}</p>
          <p className="mob-text">{`卡別：${vip}`}</p>
          <p className="mob-text">{`帳號等級：${level}`}</p>
        </div>
      </div>
    </div>
  )
}

export const AccountCard = {
  List: memo(AccountList),
  Container: memo(AccountCardContainer),
  Content: memo(AccountCardContent),
}
