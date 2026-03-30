import { useCallback, useMemo } from 'react'
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns'
import useGetHistoryAPI from '@/apis/client/points/use-get-history'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useMouseModeStore } from '@/store/global/use-mouse-mode'

export type MonthOption = {
  id: string
  label: string
  startTime: string
  endTime: string
}

export const MONTH_PREVIEW_COUNT = 2
const PAGE_SIZE = 10

function useTransactionsView() {
  const isDragging = useMouseModeStore((state) => state.isDragging)

  const monthOptions: MonthOption[] = useMemo(() => {
    const now = new Date()
    const options: MonthOption[] = []

    for (let i = MONTH_PREVIEW_COUNT; i >= 0; i -= 1) {
      const targetDate = subMonths(now, i)

      options.push({
        id: format(targetDate, 'yyyy/MM'),
        label: `${format(targetDate, 'yyyy/MM')}月`,
        startTime: String(startOfMonth(targetDate).getTime()),
        endTime: String(endOfMonth(targetDate).getTime()),
      })
    }

    return options.reverse()
  }, [])

  const defaultMonth = monthOptions[0]

  const [queryState, setQueryState] = useQueryStates({
    startTime: parseAsString.withDefault(defaultMonth.startTime),
    endTime: parseAsString.withDefault(defaultMonth.endTime),
    type: parseAsString.withDefault('add'),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(PAGE_SIZE),
  })

  const activeMonth = useMemo(() => {
    const match = monthOptions.find(
      (option) => option.startTime === queryState.startTime && option.endTime === queryState.endTime
    )
    return match?.id ?? defaultMonth.id
  }, [defaultMonth.id, monthOptions, queryState.endTime, queryState.startTime])

  const { data: pointsHistory, isLoading, error } = useGetHistoryAPI(queryState)

  const historyList = pointsHistory?.list ?? []
  const totalCount = pointsHistory?.total ?? 0
  const currentPage = queryState.page ?? 1

  const handleToggleButtonChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // 如果正在拖曳，阻止點擊事件
      if (isDragging) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      // get value from data-value
      const value = event.currentTarget.dataset.value
      const selected = monthOptions.find((option) => option.id === value)

      if (!selected) return

      void setQueryState({
        startTime: selected.startTime,
        endTime: selected.endTime,
        type: queryState.type,
        page: 1,
        limit: PAGE_SIZE,
      })
    },
    [monthOptions, queryState.type, setQueryState, isDragging]
  )

  const handleTypeButtonChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDragging) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      const value = event.currentTarget.dataset.value
      if (!value) return

      void setQueryState({
        startTime: queryState.startTime,
        endTime: queryState.endTime,
        type: value,
        page: 1,
        limit: PAGE_SIZE,
      })
    },
    [queryState.endTime, queryState.startTime, setQueryState, isDragging]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      void setQueryState({
        startTime: queryState.startTime,
        endTime: queryState.endTime,
        type: queryState.type,
        page: Math.max(1, page),
        limit: PAGE_SIZE,
      })
    },
    [queryState.endTime, queryState.startTime, queryState.type, setQueryState]
  )

  return {
    monthOptions,
    activeMonth,
    activeType: queryState.type,
    historyList,
    totalCount,
    currentPage,
    pageSize: queryState.limit ?? PAGE_SIZE,
    isLoading,
    error,
    handleToggleButtonChange,
    handleTypeButtonChange,
    handlePageChange,
  }
}

export default useTransactionsView
