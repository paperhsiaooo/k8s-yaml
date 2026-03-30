import { useCallback } from 'react'

interface TagsConfig {
  itemWidth: number
  gapSize: number
}

type Tag = {
  id: string
  name: string
}

// 自動滾到指定 tab 按钮
export const useAutoScrollToItem = (
  tagsConfig: TagsConfig,
  tags: Tag[],
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
) => {
  const { itemWidth, gapSize } = tagsConfig

  const scrollToItem = useCallback(
    (targetId: string) => {
      const container = scrollContainerRef.current
      if (!container) return

      const buttonIndex = tags.findIndex((tag) => tag.id === targetId)
      if (buttonIndex === -1) return

      // 估算按鈕位置
      const buttonPosition = buttonIndex * (itemWidth + gapSize)
      const containerWidth = container.offsetWidth
      const targetScrollLeft = buttonPosition - containerWidth / 2 + itemWidth / 2

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      })
    },
    [gapSize, itemWidth, scrollContainerRef, tags]
  )

  return { scrollToItem }
}
