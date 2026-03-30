import { InputHTMLAttributes, JSX } from 'react'
import { cn } from '@/lib/utils'
import RHFTextField from '../rhf-textfield'

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'onChange' | 'id' | 'defaultValue'
> & {
  name: string
  placeholder?: string
  disabled?: boolean
  transformValue?: (value: string) => string
}

function CommonRHFTextField({
  name,
  placeholder,
  disabled,
  className,
  transformValue,
  ...rest
}: Props): JSX.Element {
  return (
    <RHFTextField
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      transformValue={transformValue}
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
        placeholder:text-yile-300/60
        disabled:text-black-1/80
        disabled:bg-[#545863]/10
        disabled:border-[#545863]/20
        autofill:bg-yile-50
        autofill:text-yile-300
        autofill:border-yellow-2
        autofill:[box-shadow:0_0_0_1000px_var(--color-yile-50)_inset]
        focus:autofill:bg-yile-50
        focus:autofill:text-yile-300
        focus:autofill:border-yellow-2
        `,
        className
      )}
      {...rest}
    />
  )
}

export default CommonRHFTextField
