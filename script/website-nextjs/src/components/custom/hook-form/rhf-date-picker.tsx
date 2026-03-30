import * as React from 'react'
import type { JSX } from 'react'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { Controller, useFormContext } from 'react-hook-form'
import { ChevronDownIcon } from 'lucide-react'
import type { Matcher } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type CalendarProps = Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'>

type Props = CalendarProps & {
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  buttonClassName?: string
  popoverContentClassName?: string
  autoClose?: boolean
  formatDate?: (date: Date) => string
  onDateChange?: (date: Date | undefined) => void
  id?: string
  minDate?: Date
  maxDate?: Date
  placeholderClassName?: string
  selectedClassName?: string
  placeholderHoverClassName?: string
  selectedHoverClassName?: string
}

const defaultFormatDate = (date: Date): string => format(date, 'yyyy年MM月dd日', { locale: zhTW })

export default function RHFDatePicker({
  name,
  label,
  placeholder = '年/月/日',
  disabled = false,
  className,
  buttonClassName,
  popoverContentClassName,
  placeholderClassName = 'text-muted-foreground',
  selectedClassName = '',
  placeholderHoverClassName = '',
  selectedHoverClassName = '',
  autoClose = true,
  formatDate = defaultFormatDate,
  onDateChange,
  id,
  minDate,
  maxDate,
  ...calendarProps
}: Props): JSX.Element {
  const { control } = useFormContext()
  const [open, setOpen] = React.useState(false)
  const fieldId = id || name
  const {
    disabled: calendarDisabled,
    captionLayout: calendarCaptionLayout,
    ...restCalendarProps
  } = calendarProps as CalendarProps & {
    disabled?: Matcher | Matcher[]
    captionLayout?: React.ComponentProps<typeof Calendar>['captionLayout']
  }
  const captionLayout = calendarCaptionLayout ?? 'dropdown'

  const disabledMatchers = React.useMemo<Matcher[]>(() => {
    const matchers: Matcher[] = []
    if (calendarDisabled) {
      matchers.push(...(Array.isArray(calendarDisabled) ? calendarDisabled : [calendarDisabled]))
    }
    if (minDate) {
      matchers.push({ before: normalizeDate(minDate) })
    }
    if (maxDate) {
      matchers.push({ after: normalizeDate(maxDate) })
    }
    return matchers
  }, [calendarDisabled, maxDate, minDate])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const rawValue = field.value
        const selectedDate =
          rawValue instanceof Date ? rawValue : rawValue ? new Date(rawValue) : undefined
        const isValidDate = selectedDate instanceof Date && !Number.isNaN(selectedDate.getTime())
        const displayDate = isValidDate ? formatDate(selectedDate) : placeholder

        const handleSelect = (date: Date | undefined) => {
          const normalized = date ? normalizeDate(date) : undefined
          field.onChange(normalized ? normalized.getTime() : undefined)
          onDateChange?.(normalized)
          if (autoClose && normalized) setOpen(false)
        }

        return (
          <div className={cn('flex flex-col gap-1', className)}>
            {label ? (
              <Label htmlFor={fieldId} className="px-1">
                {label}
              </Label>
            ) : null}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id={fieldId}
                  disabled={disabled}
                  className={cn(
                    'w-48 justify-between hover:!bg-transparent hover:!text-inherit',
                    isValidDate ? selectedClassName : placeholderClassName,
                    isValidDate ? selectedHoverClassName : placeholderHoverClassName,
                    buttonClassName
                  )}
                >
                  {displayDate}
                  <span className="relative size-5 rounded-full bg-yile-600">
                    <ChevronDownIcon className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-white" />
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={cn('w-auto overflow-hidden p-0', popoverContentClassName)}
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={isValidDate ? selectedDate : undefined}
                  defaultMonth={isValidDate ? selectedDate : undefined}
                  onSelect={handleSelect}
                  disabled={disabledMatchers.length ? disabledMatchers : undefined}
                  captionLayout={captionLayout}
                  {...restCalendarProps}
                />
              </PopoverContent>
            </Popover>

            {error && <span className="text-sm text-red-500">{error.message}</span>}
          </div>
        )
      }}
    />
  )
}

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
