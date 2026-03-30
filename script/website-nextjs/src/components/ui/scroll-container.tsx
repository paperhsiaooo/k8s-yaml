'use client'

import { useMouseDragHandler } from '@/hooks/use-mouse-drag-handler'
import { forwardRef, useCallback, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useMouseModeStore } from '@/store/global/use-mouse-mode'

interface ScrollContainerProps {
  dragConfig?: {
    threshold?: number
    sensitivity?: number
  }
  className?: string
  children: ReactNode
}

const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({ dragConfig, className, children }, ref) => {
    const dragHandler = useMouseDragHandler(ref as React.RefObject<HTMLDivElement>, dragConfig)
    const setIsDragging = useMouseModeStore((state) => state.setIsDragging)

    // 滑鼠事件處理（僅桌面版）
    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        dragHandler.initializeDrag(e.pageX, e.pageY)
      },
      [dragHandler]
    )

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        const moved = dragHandler.handleDragMove(e.pageX, e.pageY)
        if (moved) e.preventDefault()
      },
      [dragHandler]
    )

    const handleMouseOver = useCallback(() => {
      dragHandler.resetDragState()
      setIsDragging(dragHandler.hasMoved)
    }, [dragHandler, setIsDragging])

    return (
      <div
        ref={ref}
        className={cn('w-full overflow-x-auto scrollbar-hide scroll-smooth select-none', className)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseOver}
        onMouseLeave={handleMouseOver}
      >
        {children}
      </div>
    )
  }
)

ScrollContainer.displayName = 'ScrollContainer'

export default ScrollContainer
