import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import { memo } from 'react'

type Props = WithClassName<{
  notes: string
}>

function NoteBlock({ notes, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <p className="text-black-1 mob-text-bold-02 1440:web-text-bold-01">
        注意事項　
        <br className="1440:hidden" />
        <span className="text-red-1 mob-text-bold-01 1440:web-text-bold-01">
          ※按下確認兌換按鈕，代表已了解並同意此注意事項。
        </span>
      </p>

      <div className="p-[2px] rounded-lg bg-gradient-03">
        <div
          className="bg-[#f6f7f7] p-4 rounded-[calc(0.5rem-0.5px)]"
          dangerouslySetInnerHTML={{ __html: notes }}
        />
      </div>
    </div>
  )
}

export default memo(NoteBlock)
