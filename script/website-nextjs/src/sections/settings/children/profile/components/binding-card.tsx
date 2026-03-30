import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import Image from 'next/image'

type BindingCardProps = WithClassName<{
  imageUrl: string
  nickname: string
  cardType: string
  memberId: string
  level: string
}>

function BindingCard({ className, imageUrl, nickname, memberId, level }: BindingCardProps) {
  return (
    <div className={cn('rounded-full bg-yile-100', className)}>
      <div className="p-2 flex flex-row items-center gap-x-2">
        <div className="relative w-[50px] aspect-square overflow-hidden border-white border-2 rounded-full">
          <Image src={imageUrl} alt="avatar" fill />
        </div>

        <div className="flex-1">
          <p className="font-bold">{nickname}</p>
          <p className="text-sm text-black-1">
            會員ID: {memberId}｜等級: {level}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BindingCard
