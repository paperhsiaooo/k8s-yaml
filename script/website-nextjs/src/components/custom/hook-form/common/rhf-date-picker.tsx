import type { JSX } from 'react'

import { cn } from '@/lib/utils'

import RHFDatePicker from '../rhf-date-picker'

type Props = React.ComponentProps<typeof RHFDatePicker>

function CommonRHFDatePicker({
  className,
  buttonClassName,
  popoverContentClassName,
  ...rest
}: Props): JSX.Element {
  return (
    <RHFDatePicker
      className={cn('w-full', className)}
      buttonClassName={cn(
        `
        w-full
        justify-between
        bg-yile-50
        border-yellow-2
        focus-visible:bg-yile-50/50
        rounded-2xl
        px-3
        py-2.5
        h-auto
        mob-text-bold-01
        font-[900]
        hover:!bg-yile-50
        disabled:text-black-1/80
        disabled:bg-[#545863]/10
        disabled:border-[#545863]/20
        `,
        buttonClassName
      )}
      placeholderClassName="text-yile-300/60"
      selectedClassName="text-yile-300"
      placeholderHoverClassName="hover:!text-yile-300/60"
      selectedHoverClassName="hover:!text-yile-300"
      popoverContentClassName={cn(
        'border border-yellow-2 rounded-2xl bg-white',
        popoverContentClassName
      )}
      {...rest}
    />
  )
}

export default CommonRHFDatePicker
