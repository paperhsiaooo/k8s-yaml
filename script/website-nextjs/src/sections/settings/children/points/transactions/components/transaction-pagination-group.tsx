import PaginationButton from '@/components/custom/button/pagination-button'
import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'

type Props = WithClassName<{
  totalCount?: number
  currentPage?: number
  pageSize?: number
  onPageChange?: (page: number) => void
}>

function TransactionPaginationGroup({
  className,
  totalCount = 0,
  currentPage = 1,
  pageSize = 20,
  onPageChange,
}: Props) {
  const safePageSize = pageSize > 0 ? pageSize : 1
  const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize))
  const activePage = Math.min(Math.max(1, currentPage), totalPages)
  const handleChange = onPageChange ?? (() => {})

  const buildPages = (): Array<number | 'ellipsis'> => {
    // Always show enough neighbors so users can move past the ellipsis without jumping to the ends.
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    if (activePage <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis', totalPages]
    }

    if (activePage >= totalPages - 3) {
      return [
        1,
        'ellipsis',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      1,
      'ellipsis',
      activePage - 1,
      activePage,
      activePage + 1,
      'ellipsis',
      totalPages,
    ]
  }

  const pageItems = buildPages()

  return (
    <div className={cn(className, 'flex justify-center items-center gap-2 640:gap-3')}>
      <PaginationButton
        label="«"
        className="640:size-9"
        disabled={activePage === 1}
        onClick={() => handleChange(1)}
      />

      {pageItems.map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="mob-em-small text-gray px-1">
            ...
          </span>
        ) : (
          <PaginationButton
            key={item}
            className="640:size-9"
            label={`${item}`}
            isActive={item === activePage}
            onClick={() => handleChange(item)}
          />
        )
      )}

      <PaginationButton
        label="»"
        className="640:size-9"
        disabled={activePage === totalPages}
        onClick={() => handleChange(totalPages)}
      />
    </div>
  )
}

export default TransactionPaginationGroup
