import { useEffect } from 'react'
import FilterButton from '@/components/custom/button/filter-button'
import { MonthOption } from '../hook/use-transactions-view'
import { WithClassName } from '@/types/common'
import { cn } from '@/lib/utils'
import { useScrollButtonIntoView } from '@/hooks/use-scroll-button-into-view'
import ScrollContainer from '@/components/ui/scroll-container'
import Button2 from '@/components/custom/button/button2'

type Props = WithClassName<{
  monthOptions: MonthOption[]
  activeMonth: string
  handleToggleButtonChange: (event: React.MouseEvent<HTMLButtonElement>) => void
  activeType: string
  handleTypeButtonChange: (event: React.MouseEvent<HTMLButtonElement>) => void
}>

function TransactionToggleButtonGroup({
  monthOptions,
  activeMonth,
  activeType,
  className,
  handleToggleButtonChange,
  handleTypeButtonChange,
}: Props) {
  const { scrollContainerRef, scrollButtonIntoView } = useScrollButtonIntoView()

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const activeButton = container.querySelector<HTMLButtonElement>(
      `button[data-value="${activeMonth}"]`
    )

    scrollButtonIntoView(activeButton)
  }, [activeMonth, scrollButtonIntoView, scrollContainerRef])

  return (
    <div className={cn(className)}>
      <div>
        <div className="relative mb-4 640:mb-5 1440:mb-9">
          <ScrollContainer
            ref={scrollContainerRef}
            className="relative z-10 overflow-x-auto touch-pan-x"
          >
            <div className="flex flex-nowrap w-max min-w-full items-center justify-center gap-2 1440:gap-9">
              {monthOptions.map((option) => (
                <FilterButton
                  key={option.id}
                  id={option.id}
                  label={option.label}
                  isActive={activeMonth === option.id}
                  className="w-28 shrink-0 1440:w-auto"
                  onClick={handleToggleButtonChange}
                />
              ))}
            </div>
          </ScrollContainer>
          <p className="absolute bottom-0 left-0 w-full h-[1px] z-0 -translate-y-[3px] bg-yile-100" />
        </div>

        <div className="flex gap-2 px-4 640:px-5 640:gap-3 1440:px-[75px] 1440:gap-6">
          <Button2
            id="add"
            label="點數收入"
            className="whitespace-nowrap mob-button-small px-4 py-2 1440:px-12 1440:py-6 1440:web-button-small"
            isActive={activeType === 'add'}
            handleOnClick={handleTypeButtonChange}
          />
          <Button2
            id="use"
            label="點數支出"
            className="whitespace-nowrap mob-button-small px-4 py-2 1440:px-12 1440:py-6 1440:web-button-small"
            isActive={activeType === 'use'}
            handleOnClick={handleTypeButtonChange}
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionToggleButtonGroup
