import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import type { BreadcrumbItem } from '@/routes/path'

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <p className="flex flex-row items-center gap-x-1 mob-text-bold-01 1440:web-text-bold-01 text-white 1440:justify-center">
      {items.flatMap((item, index) => {
        const keyBase = `${item.href ?? 'null'}-${item.label}`
        const elements = [
          item.href ? (
            <Link
              key={`crumb-${keyBase}`}
              href={item.href}
              className="flex flex-row items-center gap-x-0.5 web-text-bold-01 640:text-lg"
            >
              {item.icon && <item.icon className="size-5" />}
              {item.label}
            </Link>
          ) : (
            <span key={`crumb-${keyBase}`} className="web-text-bold-01 640:text-lg">
              {item.label}
            </span>
          ),
        ]

        if (index < items.length - 1) {
          elements.push(
            <ChevronRight
              className="pt-[2px] w-5 h-5 1440:size-6"
              strokeWidth={3}
              key={`separator-${keyBase}`}
            />
          )
        }

        return elements
      })}
    </p>
  )
}

type Props = {
  breadcrumbs: BreadcrumbItem[]
  bgImage?: string
}

function BreadcrumbsBar({
  breadcrumbs,
  bgImage = '[background-image:var(--color-gradient-07)]',
}: Props) {
  return (
    <div className={`relative pb-10 px-6 1440:px-0 1440:pt-4 ${bgImage}`}>
      <Breadcrumbs items={breadcrumbs} />
      <div className="absolute z-10 bottom-[-1px] left-0 w-full h-8 [background-image:url('/images/wave-01.webp')] bg-repeat bg-size-[auto_32px]" />
    </div>
  )
}

export default BreadcrumbsBar
