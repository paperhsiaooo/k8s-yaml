import FilterButton from '@/components/custom/button/filter-button'
import { SHIPMENT_STATUS } from '@/constants/shipment-status'
import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  curStatus: string
  onButtonChange: (value: string) => void
}>

function ShipmentToggleButtonGroup({ curStatus, onButtonChange, className }: Props) {
  const handleButtonChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.dataset.value
    onButtonChange(value || '')
  }

  return (
    <div className={cn('relative', className)}>
      <div className="relative z-10 overflow-x-auto touch-pan-x">
        <div className="flex flex-nowrap w-max min-w-full items-center justify-center gap-2 px-2">
          {Object.values(SHIPMENT_STATUS).map((status) => {
            const isActive = curStatus === status.code

            return (
              <FilterButton
                key={status.code}
                id={status.code}
                label={status.label}
                isActive={isActive}
                className="w-28 shrink-0"
                onClick={handleButtonChange}
              />
            )
          })}
        </div>
      </div>

      <p className="absolute bottom-0 left-0 w-full h-[1px] z-0 -translate-y-[3px] bg-yile-100" />
    </div>
  )
}

export default ShipmentToggleButtonGroup
