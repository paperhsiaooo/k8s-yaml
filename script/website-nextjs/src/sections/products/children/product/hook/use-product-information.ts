import { useCallback, useState } from 'react'

export const TABS = {
  INTRODUCTIONS: 'introductions',
  NOTES: 'notes',
}

function useProductInformation() {
  const [activeTab, setActiveTab] = useState<string>(TABS.INTRODUCTIONS)

  const handleTabButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.dataset.value

    if (value === TABS.INTRODUCTIONS || value === TABS.NOTES) {
      setActiveTab(value)
    }
  }, [])

  return {
    activeTab,
    handleTabButtonClick,
  }
}

export default useProductInformation
