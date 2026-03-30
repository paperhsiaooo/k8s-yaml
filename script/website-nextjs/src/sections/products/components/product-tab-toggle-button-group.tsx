import FilterButton from '@/components/custom/button/filter-button'
import { WithClassName } from '@/types/common'
import { cn } from '@/lib/utils'
import { useScrollButtonIntoView } from '@/hooks/use-scroll-button-into-view'

type TabOption = {
  id: string
  label: string
}

type Props = WithClassName<{
  tabOptions: TabOption[]
  activeTab: string
  handleTabChange: (event: React.MouseEvent<HTMLButtonElement>) => void
}>

function ProductTabToggleButtonGroup({ tabOptions, activeTab, className, handleTabChange }: Props) {
  const { scrollContainerRef, scrollButtonIntoView } = useScrollButtonIntoView()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleTabChange(event)
    scrollButtonIntoView(event.currentTarget)
  }

  return (
    <div className={cn(className)}>
      <div className="space-y-4">
        <div className="relative">
          <div ref={scrollContainerRef} className="relative z-10 overflow-x-auto touch-pan-x">
            <div className="flex flex-nowrap w-max min-w-full items-center justify-center gap-2 1440:gap-8">
              {tabOptions.map((option) => (
                <FilterButton
                  key={option.id}
                  id={option.id}
                  label={option.label}
                  isActive={activeTab === option.id}
                  className="w-28 shrink-0 1440:w-36"
                  onClick={handleClick}
                />
              ))}
            </div>
          </div>
          <p className="absolute bottom-0 left-0 w-full h-[1px] z-0 -translate-y-[3px] bg-yile-100" />
        </div>
      </div>
    </div>
  )
}

export default ProductTabToggleButtonGroup
