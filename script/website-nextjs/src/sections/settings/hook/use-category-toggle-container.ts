import { getSettingsNav } from '@/routes/path'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useMouseModeStore } from '@/store/global/use-mouse-mode'

function useCategoryToggleContainer() {
  const router = useRouter()
  const buttons = getSettingsNav()
  const isDragging = useMouseModeStore((state) => state.isDragging)

  const handleOnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // 如果正在拖曳，阻止點擊事件
      if (isDragging) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      const href = event.currentTarget.getAttribute('data-value')

      if (!href) return
      router.push(href)
    },
    [router, isDragging]
  )

  return {
    buttons,
    handleOnClick,
  }
}

export default useCategoryToggleContainer
