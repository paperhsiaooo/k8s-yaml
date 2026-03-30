'use client'

import { Button } from '@/components/ui/button'
import { paths } from '@/routes/path'
import Link from 'next/link'

function Error403() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl font-bold text-black-1">404</h1>
      <p className="text-center">糟糕，你找不到這個頁面。</p>
      <Button className="cursor-pointer" asChild>
        <Link href={paths.root}>回首頁</Link>
      </Button>
    </div>
  )
}

export default Error403
