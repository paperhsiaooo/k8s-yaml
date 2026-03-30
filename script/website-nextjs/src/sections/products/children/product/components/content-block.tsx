'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  // 主要顯示內容，未來可由後台 Rich Text 轉換後傳入
  content?: string
  className?: string
}

function ContentBlock({ content = '', className }: Props) {
  return (
    <div
      className={cn('text-yile-950 break-all', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default memo(ContentBlock)
