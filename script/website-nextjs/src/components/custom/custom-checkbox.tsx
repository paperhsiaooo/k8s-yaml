'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@/lib/utils'

// 自定義的打勾 SVG 圖示
function CheckmarkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 26 23" fill="none">
      <path
        d="M10.5791 22.5005C10.5756 22.5005 10.5715 22.5005 10.568 22.5005C10.4227 22.4975 10.2856 22.4354 10.1871 22.3288L0.140644 11.4046C-0.0316214 11.2171 -0.0474417 10.9346 0.103144 10.729C0.25373 10.5239 0.527949 10.4536 0.758808 10.5614L9.95393 14.8669C10.0313 14.9032 10.1227 14.8856 10.1819 14.8241L24.208 0.16453C24.3979 -0.0341031 24.7084 -0.0557828 24.924 0.115311C25.1397 0.286405 25.1895 0.593436 25.0389 0.823709L11.0865 22.1975C11.0666 22.2286 11.0432 22.2567 11.0174 22.2831L10.9559 22.3446C10.8557 22.4442 10.7197 22.5005 10.5791 22.5005Z"
        fill="#D54527"
      />
    </svg>
  )
}

interface CustomCheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  className?: string
}

function CustomCheckbox({ className, ...props }: CustomCheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'flex items-center justify-center size-5 shrink-0 rounded border-2 border-gray-400',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-white data-[state=checked]:border-gray-400',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <CheckmarkIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export default CustomCheckbox
