'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { paths } from '@/routes/path'
import useHeader from './hook/use-header'
import { IoIosClose } from 'react-icons/io'
import { ChevronDownIcon } from 'lucide-react'
import useMemberStore from '@/store/global/use-member'
import { motion, AnimatePresence } from 'framer-motion'
import IconPoint from '@/components/custom/icons/icon-point'
import { formatWithCommas } from '@/utils/number'
import SyncButton from '../button/sync-button'
import { usePointBalance } from '@/hooks/use-point-balance'

export default function TopBar() {
  const { point } = useHeader()
  const member = useMemberStore((state) => state.member)
  const [open, setOpen] = useState(false)
  const { refreshPoint: refreshPointBalanceAPI } = usePointBalance()

  const handleSync = useCallback(() => {
    refreshPointBalanceAPI()
  }, [refreshPointBalanceAPI])

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="open top bar"
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center justify-center rounded-full [background-image:var(--color-gradient-12)]
         py-[8px] px-[10px] border-2 border-[var(--color-yile-100)] text-white mob-text-bold-02"
      >
        <IconPoint className="w-6 mr-1" />
        <p className="text-white mob-em-small">{formatWithCommas(point?.currentBalance || 0)}</p>
        <ChevronDownIcon
          className={cn(
            'size-5 text-white transition-transform duration-200',
            open && 'rotate-180'
          )}
          strokeWidth={3}
        />
      </button>

      {/* 上方 Sidebar */}
      <AnimatePresence>
        {open && (
          <div className="1440:hidden">
            {/* 🔹 點外面區域的遮罩 */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)} // 點遮罩就關閉
            />

            <motion.div
              key="sidebar"
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 left-0 right-0 z-40 [background-image:var(--color-gradient-02)] shadow-md border-0"
            >
              <div className="px-4 640:px-6 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-between items-center">
                  <Link href={paths.root} className="py-2" onClick={() => setOpen(!open)}>
                    <div className="w-[90px] relative aspect-[1265/627] bg-white shadow-[inset_0px_-1.5px_1px_1.5px_#E46133,inset_0px_2px_1px_0.5px_#F9C846E5] 1440:shadow-none rounded-[25px] px-[14px] py-[6px] flex items-center justify-center">
                      <Image src="/images/icons/logo.webp" alt="logo" width={1265} height={627} />
                    </div>
                  </Link>
                </div>

                <div className="">
                  <button
                    type="button"
                    aria-label="close top bar"
                    onClick={() => setOpen(false)}
                    className="cursor-pointer size-10 flex items-center justify-center rounded-full bg-white/90"
                  >
                    <IoIosClose className="w-[32px] h-[32px] text-[var(--color-yile-550)]" />
                  </button>
                </div>
              </div>

              <div className="pb-4 px-4 640:px-6 flex flex-col items-stretch justify-center">
                <div className="text-white mob-menu-bold border-b border-[var(--color-yellow-2)] py-2 w-full text-center">
                  {`${member.nickName}`}
                </div>

                <div className="text-white mob-menu-bold py-2 text-center flex items-center justify-center">
                  <IconPoint className="w-6 mr-2" />
                  <p className="mob-em-bold mr-1">{formatWithCommas(point?.currentBalance || 0)}</p>
                  <SyncButton variant="secondary" onClick={handleSync} />
                </div>

                {/* <button
                  type="button"
                  aria-label="登出"
                  className="cursor-pointer flex items-center justify-center rounded-full bg-transparent border
                  border-[var(--color-yile-600)] py-[5px] w-[158px] text-[var(--color-yile-600)] mob-text-bold-02 mt-4"
                >
                  <AiOutlineUser className="text-xl mr-1" />
                  <span className="mob-text-bold-02">登出</span>
                </button> */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
