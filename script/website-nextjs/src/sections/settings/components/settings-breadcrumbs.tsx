'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import BreadcrumbsBar from '@/layouts/crumb-layout'
import { getBreadcrumbByPath } from '@/routes/path'

type Props = {
  bgImage?: string
}

function SettingsBreadcrumbs({ bgImage }: Props) {
  const pathname = usePathname()

  const breadcrumbs = useMemo(() => getBreadcrumbByPath(pathname), [pathname])

  return breadcrumbs.length > 0 ? (
    <BreadcrumbsBar breadcrumbs={breadcrumbs} bgImage={bgImage} />
  ) : null
}

export default SettingsBreadcrumbs
