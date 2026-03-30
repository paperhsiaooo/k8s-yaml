import { useCallback, useState, useRef } from 'react'
import { useMouseModeStore } from '@/store/global/use-mouse-mode'

interface MouseDragConfig {
  threshold?: number // 拖曳觸發的最小距離
  sensitivity?: number // 拖曳靈敏度
}

const RESET_DELAY = 100 // 重置狀態的延遲時間

// 滑鼠拖曳狀態管理
export const useMouseDragHandler = (
  scrollContainerRef: React.RefObject<HTMLDivElement>,
  mouseDragConfig: MouseDragConfig = {}
) => {
  const { threshold = 8, sensitivity = 1.5 } = mouseDragConfig
  const setIsDragging = useMouseModeStore((state) => state.setIsDragging)
  const isDragging = useMouseModeStore((state) => state.isDragging)

  // 使用 ref 來追蹤即時的拖曳狀態
  const isDraggingRef = useRef(false)

  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hasMoved, setHasMoved] = useState(false)

  const resetDragState = useCallback(() => {
    // 立即重置拖曳狀態
    isDraggingRef.current = false
    setIsDragging(false)
    // 延遲重置 hasMoved，確保點擊事件能正確判斷
    setTimeout(() => setHasMoved(false), RESET_DELAY)
  }, [setIsDragging])

  const initializeDrag = useCallback(
    (x: number, y: number) => {
      if (!scrollContainerRef.current) return false

      isDraggingRef.current = true
      setIsDragging(true)
      setHasMoved(false)
      setStartPosition({ x, y })
      setScrollLeft(scrollContainerRef.current.scrollLeft)
      return true
    },
    [scrollContainerRef, setIsDragging]
  )

  const handleDragMove = useCallback(
    (x: number, y: number) => {
      // 使用 ref 來檢查即時狀態
      if (!isDraggingRef.current || !scrollContainerRef.current) return false

      const deltaX = Math.abs(x - startPosition.x)
      const deltaY = Math.abs(y - startPosition.y)

      // 只有水平移動距離大於垂直移動距離且超過閾值時才視為拖曳
      if (deltaX > threshold && deltaX > deltaY) {
        setHasMoved(true)
        const walk = (x - startPosition.x) * sensitivity
        scrollContainerRef.current.scrollLeft = scrollLeft - walk
        return true
      }
      return false
    },
    [startPosition, scrollLeft, scrollContainerRef, threshold, sensitivity]
  )

  return {
    isDragging,
    hasMoved,
    initializeDrag,
    handleDragMove,
    resetDragState,
  }
}
