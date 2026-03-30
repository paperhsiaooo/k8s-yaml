import { useRef, useCallback } from 'react'

export function useScrollButtonIntoView() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollButtonIntoView = useCallback((button: HTMLButtonElement | null) => {
    const container = scrollContainerRef.current
    if (!container || !button) return

    const containerRect = container.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()
    const isFullyVisible =
      buttonRect.left >= containerRect.left && buttonRect.right <= containerRect.right

    if (!isFullyVisible) {
      button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [])

  return { scrollContainerRef, scrollButtonIntoView }
}
