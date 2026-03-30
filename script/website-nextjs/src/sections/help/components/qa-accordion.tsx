'use client'

import { memo, useCallback, useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface QAItem {
  id: string
  question: string
  answer: string
}

interface QAAccordionProps {
  items: QAItem[]
}

const QAAccordion = memo(({ items }: QAAccordionProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = useCallback((id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleItem(id)
      }
    },
    [toggleItem]
  )

  return (
    <div className="w-full">
      {items.map((item, index) => {
        const isExpanded = expandedItems.has(item.id)

        return (
          <div key={item.id}>
            <div
              className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleItem(item.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              aria-controls={`answer-${item.id}`}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
            >
              <h3 className="text-gray-800 font-medium text-base flex-1 pr-4">{item.question}</h3>
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  {isExpanded ? (
                    <Minus className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>

            <div
              id={`answer-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!isExpanded}
            >
              <div className="pb-4 pl-0">
                <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>

            {index < items.length - 1 && <div className="border-b border-gray-200" />}
          </div>
        )
      })}
    </div>
  )
})

QAAccordion.displayName = 'QAAccordion'

export default QAAccordion
