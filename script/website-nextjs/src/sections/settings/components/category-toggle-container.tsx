'use client'

import { useEffect, useMemo, useRef } from 'react'

import Button2 from '@/components/custom/button/button2'
import useCategoryToggleContainer from '../hook/use-category-toggle-container'
import { usePathname } from '@/routes/hooks'
import { isPathActive } from '@/routes/active'
import ScrollContainer from '@/components/ui/scroll-container'

function CategoryToggleContainer() {
  const { buttons, handleOnClick } = useCategoryToggleContainer()
  const pathname = usePathname()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const activeHref = useMemo(
    () => buttons.find((button) => isPathActive(pathname, button.href))?.href,
    [buttons, pathname]
  )

  useEffect(() => {
    if (!activeHref) return

    const container = scrollContainerRef.current
    if (!container) return

    const escapedHref =
      typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
        ? CSS.escape(activeHref)
        : activeHref.replace(/\\/g, '\\\\').replace(/"/g, '\\"')

    const activeElement = container.querySelector<HTMLElement>(`[data-value="${escapedHref}"]`)
    if (!activeElement) return

    activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [activeHref])

  return (
    <ScrollContainer ref={scrollContainerRef} className="w-full overflow-x-auto">
      <div className="flex w-fit min-w-full justify-center gap-4">
        {buttons.map((button) => {
          const isActive = isPathActive(pathname, button.href)

          return (
            <Button2
              id={button.href}
              key={button.title}
              label={button.title}
              className="flex-shrink-0 whitespace-nowrap mob-button-small px-4 py-2 1440:px-12 1440:py-6 1440:web-button-small"
              handleOnClick={handleOnClick}
              isActive={isActive}
            />
          )
        })}
      </div>
    </ScrollContainer>
  )
}

export default CategoryToggleContainer
