'use client'

import Button2 from '@/components/custom/button/button2'
import { JSX, memo, useCallback, useState, useRef } from 'react'
import { useAutoScrollToItem } from '@/hooks/use-scroll-to-item'
import { useMouseModeStore } from '@/store/global/use-mouse-mode'
import ScrollContainer from '@/components/ui/scroll-container'

type Tag = {
  id: string
  name: string
}

type Props = {
  tags: Tag[]
}

const tabsConfig = {
  itemWidth: 120,
  gapSize: 16,
}

function ProductTags({ tags }: Props): JSX.Element {
  const [currentId, setCurrentId] = useState(tags[0]?.id)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { scrollToItem } = useAutoScrollToItem(tabsConfig, tags, scrollContainerRef)
  const isDragging = useMouseModeStore((state) => state.isDragging)

  const updateHashAndScroll = useCallback((targetId: string) => {
    if (typeof window !== 'undefined') {
      const newHash = `#${targetId}`
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash)
      }
    }

    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const handleOnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // 如果正在拖曳，阻止點擊事件
      if (isDragging) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      const value = event.currentTarget.dataset.value as string

      setCurrentId(value)
      scrollToItem(value)
      updateHashAndScroll(value)
    },
    [scrollToItem, isDragging, updateHashAndScroll]
  )

  return (
    <ScrollContainer ref={scrollContainerRef}>
      <div className="flex w-fit min-w-full justify-center gap-2">
        {tags.map((tag) => {
          const isActive = tag.id === currentId
          return (
            <div className="min-w-max" key={tag.id}>
              <Button2
                id={tag.id}
                label={tag.name}
                isActive={isActive}
                className="whitespace-nowrap mob-button-small px-4 py-2 1440:px-12 1440:py-6 1440:web-button-small"
                handleOnClick={handleOnClick}
              />
            </div>
          )
        })}
      </div>
    </ScrollContainer>
  )
}

export default memo(ProductTags)
