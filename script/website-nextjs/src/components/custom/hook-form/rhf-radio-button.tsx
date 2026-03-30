import { Controller, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { InputHTMLAttributes, JSX } from 'react'

// ----------------------------------------------------------------------

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'onChange' | 'id' | 'defaultValue'
> & {
  id: string
  name: string
  value: string
  disabled: boolean
  className?: string
  isCustomError?: boolean
}

export default function RHFRadioButton({
  id,
  name,
  value,
  disabled,
  className,
  isCustomError = false,
  ...rest
}: Props): JSX.Element {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isChecked = field.value === value

        return (
          <div className="relative flex flex-col gap-1">
            <input
              id={id}
              type="radio"
              value={value}
              onChange={field.onChange}
              name={name}
              disabled={disabled}
              className={twMerge(
                'appearance-none relative aspect-square border-2 rounded-full border-orange-500 bg-white before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:aspect-square before:rounded-full before:bg-orange-500 before:duration-200 before:w-3/5',
                className,
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                isChecked ? 'before:opacity-100' : 'before:opacity-0'
              )}
              {...rest}
            />
            {error && !isCustomError && (
              <label className="text-red-500 text-sm">{error?.message}</label>
            )}
          </div>
        )
      }}
    />
  )
}
