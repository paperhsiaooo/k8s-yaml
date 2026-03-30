import { InputHTMLAttributes, JSX } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'onChange' | 'id' | 'defaultValue'
> & {
  name: string
  placeholder?: string
  className?: string
  isCustomError?: boolean
  transformValue?: (value: string) => string
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
}

export default function RHFTextField({
  name,
  className,
  placeholder,
  isCustomError = false,
  transformValue,
  onChange: externalOnChange,
  ...rest
}: Props): JSX.Element {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          <Input
            value={field.value}
            id={name}
            name={name}
            placeholder={placeholder}
            autoComplete={name}
            className={cn('text-sm', className)}
            onChange={(event) => {
              const rawValue = event.target.value
              const nextValue = transformValue ? transformValue(rawValue) : rawValue
              field.onChange(nextValue)
              externalOnChange?.(event)
            }}
            {...rest}
          />
          {error && !isCustomError && (
            <label className="text-red-500 text-sm">{error?.message}</label>
          )}
        </div>
      )}
    />
  )
}
