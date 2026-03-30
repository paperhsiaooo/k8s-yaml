import Link from 'next/link'
import { memo } from 'react'

type Props = {
  title: string
  href: string
}

function HeaderButton({ title, href }: Props) {
  return (
    <Link href={href}>
      <div className="px-3 py-3 1440:px-[26px] 1440:py-[29px]">
        <p className="text-base font-bold 1440:web-menu-bold text-yile-950">{title}</p>
      </div>
    </Link>
  )
}

export default memo(HeaderButton)
