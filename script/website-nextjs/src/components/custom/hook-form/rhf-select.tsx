import { Controller, useFormContext } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { JSX } from 'react'
import { cn } from '@/lib/utils'

// ----------------------------------------------------------------------

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

export default function RHFSelect({
  name,
  className,
  options,
  placeholder,
  disabled = false,
  isCustomError = false,
  onValueChange,
  ...rest
}: Props): JSX.Element {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          <Select
            value={field.value}
            onValueChange={onValueChange || field.onChange}
            name={name}
            {...rest}
          >
            <SelectTrigger disabled={disabled} className={cn(' bg-white', className)}>
              <SelectValue placeholder={placeholder || '請選擇'} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option: Option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && !isCustomError && (
            <label className="text-red-500 text-sm">{error?.message}</label>
          )}
        </div>
      )}
    />
  )
}
