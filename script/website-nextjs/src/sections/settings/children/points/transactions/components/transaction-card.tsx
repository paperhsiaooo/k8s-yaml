import { POINT_TYPE } from '@/constants/point-type'
import { cn } from '@/lib/utils'
import { formatWithCommas } from '@/utils/number'
import { formatISO9075 } from 'date-fns'
import { JSX, memo } from 'react'

type Props = {
  title: string
  date: number
  point: number
  type?: string
}

function TransactionCard({
  title,
  date,
  point,
  type = POINT_TYPE.Income.code,
}: Props): JSX.Element {
  return (
    <div className="bg-[#54586314] rounded-[10px]">
      <div className="flex flex-col justify-start p-3 640:flex-row 640:px-5 640:py-2.5 1440:px-7">
        <div className="flex-1">
          <p className="mob-button-small text-gray 640:mb-1.5 1440:web-menu-bold">{title}</p>
          <p className="mob-text text-black-1 1440:web-text-small">
            {formatISO9075(new Date(date), { representation: 'date' })}
          </p>
        </div>
        <div
          className={cn(
            'mob-em-bold self-end 640:self-center',
            type === POINT_TYPE.Expense.code ? 'text-red-2' : 'text-green-3'
          )}
        >
          {`${type === POINT_TYPE.Income.code ? '+' : ''}${formatWithCommas(point)}`}
        </div>
      </div>
    </div>
  )
}

export default memo(TransactionCard)
