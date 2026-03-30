'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSetup from '@/components/app-setup'
import Header from '@/components/custom/header/header'
import Footer from '@/components/footer'
import QueryProvider from './query-provider'

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const showFooter = useMemo(() => {
    let result = true
    // /products/id 在 page.tsx 顯示 footer
    const isProductPage = /^\/products\/[^/]+$/.test(pathname)
    const ruleList = [isProductPage]
    for (const rule of ruleList) {
      if (rule) {
        result = false
        break
      }
    }
    return result
  }, [pathname])

  return (
    <QueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />

      {/* For some initialize function.  */}
      <AppSetup />

      <SidebarProvider className="flex-col">
        <Header className="shrink-0" />
        <main className="flex-1 flex flex-col">{children}</main>

        {showFooter && <Footer className="shrink-0" />}
      </SidebarProvider>
    </QueryProvider>
  )
}
