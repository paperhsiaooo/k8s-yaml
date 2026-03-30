'use client'

import Image from 'next/image'
import Link from 'next/link'
import LoginButton from './login-button'
import { collectNavByScope, paths } from '@/routes/path'
import useHeader from './hook/use-header'
import HeaderButton from './components/header-button'
import { useSidebar } from '@/components/ui/sidebar'
import TopBar from './top-bar'
import MobileSidebar from './mobile-sidebar'
import { WithClassName } from '@/types/common'
import { cn } from '@/lib/utils'
import SettingsBreadcrumbs from '@/sections/settings/components/settings-breadcrumbs'
import IconMenu from '../icons/icon-menu'

type Props = WithClassName

function Header({ className }: Props) {
  const { auth, point } = useHeader()
  const { toggleSidebar } = useSidebar()
  const buttons = collectNavByScope('header')

  return (
    <header
      className={cn(
        '[background-image:var(--color-gradient-07)] 1440:bg-none 1440:bg-yile-50',
        className
      )}
    >
      <div className="px-4 py-4 flex flex-row justify-between items-center 640:px-6 1440:py-0 1440:border-b-[1px] 1440:border-[#FF9700]">
        <Link href={paths.root}>
          <div className="w-[90px] relative aspect-[1265/627] bg-white shadow-[inset_0px_-1.5px_1px_1.5px_#E46133,inset_0px_2px_1px_0.5px_#F9C846E5] rounded-[25px] px-[14px] py-[6px] flex items-center justify-center 1440:shadow-none 1440:w-[135px] 1440:bg-transparent">
            <Image src="/images/icons/logo.webp" alt="logo" width={1265} height={627} />
          </div>
        </Link>

        <div className="flex items-center gap-x-1.5 1440:hidden">
          {auth.isLogin && <TopBar />}

          <button
            type="button"
            aria-label="開啟選單"
            onClick={toggleSidebar}
            className="cursor-pointer size-10 flex items-center justify-center rounded-full bg-white shadow-[inset_0px_-1.5px_1px_0px_#E46133,inset_0px_1.5px_1px_0.5px_#F9C846E5]"
          >
            <IconMenu className="size-6" />
          </button>
        </div>

        <div className="hidden 1440:flex flex-row justify-between items-center gap-x-1 1440:gap-x-2">
          <div className="flex flex-row 1440:gap-x-5">
            {buttons.map((button) => (
              <HeaderButton key={button.title} title={button.title} href={button.href} />
            ))}
            {auth.isLogin && <HeaderButton title="會員中心" href={paths.settings.root} />}
          </div>
          <LoginButton isLogin={auth.isLogin} point={point?.currentBalance} />
        </div>
      </div>

      <MobileSidebar />

      <SettingsBreadcrumbs bgImage="bg-transparent 1440:[background-image:var(--color-gradient-07)]" />
    </header>
  )
}

export default Header
