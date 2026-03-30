'use client'

/**
 * 手機版側欄選單（使用 shadcn Sidebar）
 * - 從左側滑出
 * - 依登入狀態顯示「會員中心」與「登出」
 * - 點擊任一選項後會關閉側欄
 */

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { collectNavByScope, paths } from '@/routes/path'
import { IoIosClose } from 'react-icons/io'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'
import useHeader from './hook/use-header'
import { useIsTablet } from '@/hooks/use-tablet'

export default function MobileSidebar() {
  const { auth } = useHeader()
  const { setOpenMobile, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  const isTablet = useIsTablet()

  // 點擊連結後關閉側欄
  const handleNavigate = () => setOpenMobile(false)

  const buttons = collectNavByScope('sidebar')

  if (!isTablet) return null

  return (
    // 僅手機顯示（桌機不渲染），從左側滑出
    <Sidebar side="left" collapsible="offcanvas">
      <SidebarContent className="[background-image:var(--color-gradient-02)]">
        <div className="px-4 flex flex-row justify-between items-center 1440:px-6">
          <div className="flex flex-row justify-between items-center">
            <Link href={paths.root} className="py-2" onClick={toggleSidebar}>
              <div className="w-[90px] relative aspect-[1265/627] bg-white shadow-[inset_0px_-1.5px_1px_1.5px_#E46133,inset_0px_2px_1px_0.5px_#F9C846E5] 1440:shadow-none rounded-[25px] px-[14px] py-[6px] flex items-center justify-center">
                <Image src="/images/icons/logo.webp" alt="logo" width={1265} height={627} />
              </div>
            </Link>
          </div>

          <div className="1440:hidden">
            <button
              type="button"
              aria-label="close sidebar"
              onClick={toggleSidebar}
              className="cursor-pointer size-10 flex items-center justify-center rounded-full bg-white/90"
            >
              <IoIosClose className="w-[32px] h-[32px] text-[var(--color-yile-550)]" />
            </button>
          </div>
        </div>

        <SidebarGroup>
          <SidebarMenu>
            {buttons.map((m) => {
              const isActive = pathname === m.href
              return (
                <SidebarMenuItem key={m.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="flex items-center justify-center text-white mb-4
                    data-[active=true]:bg-transparent data-[active=true]:text-[var(--color-yile-950)] data-[active=true]:font-bold
                    hover:bg-transparent hover:text-[var(--color-yile-950)] active:bg-transparent active:text-[var(--color-yile-950)]"
                  >
                    <Link
                      href={m.href}
                      onClick={handleNavigate}
                      className="mob-button-bold text-xl"
                    >
                      {m.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}

            {auth.isLogin && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(paths.settings.root)}
                    className="flex items-center justify-center text-white mb-4
                    data-[active=true]:bg-transparent data-[active=true]:text-[var(--color-yile-950)] data-[active=true]:font-bold
                    hover:bg-transparent hover:text-[var(--color-yile-950)] active:bg-transparent active:text-[var(--color-yile-950)]"
                  >
                    <Link
                      href={paths.settings.root}
                      onClick={handleNavigate}
                      className="mob-button-bold text-xl"
                    >
                      會員中心
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
