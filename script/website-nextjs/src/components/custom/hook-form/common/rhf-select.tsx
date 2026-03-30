import { JSX } from 'react'
import RHFSelect from '../rhf-select'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  placeholder?: string
  className?: string
  options: Option[]
  disabled?: boolean
  isCustomError?: boolean
  onValueChange?: (value: string) => void
}

type Option = {
  label: string
  value: string
}

function CommonRHFSelect({ name, placeholder, disabled, className, ...rest }: Props): JSX.Element {
  return (
    <RHFSelect
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      className={cn(
        `
        bg-yile-50
        border-yellow-2
        focus-visible:bg-yile-50/50
        rounded-2xl
        px-3
        py-2.5
        h-auto
        mob-text-bold-01
        text-yile-400
        data-[placeholder]:text-yile-300/60
        disabled:text-black-1/80
        disabled:bg-[#545863]/10
        disabled:border-[#545863]/20
        `,
        className
      )}
      {...rest}
    />
  )
}

export default CommonRHFSelect
