import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'

type CategoryTitleBoxProps = WithClassName<{
  children: React.ReactNode
}>

type CategoryTitleProps = WithClassName<{
  title: string
  children?: React.ReactNode
}>

function CategoryTitleBox({ children, className }: CategoryTitleBoxProps) {
  return (
    <div
      className={cn(
        'px-4 pt-[30px] pb-2.5 mob-h1 640:px-5 640:pt-[30px] 640:mb-5 1440:px-12 1440:pt-9 1440:mb-9 1440:web-h1 [background-image:var(--color-gradient-09)]',
        className
      )}
    >
      {children}
    </div>
  )
}

function CategoryTitle({ children, title, className }: CategoryTitleProps) {
  return (
    <h3 className={cn('relative pb-2.5', className)}>
      <span className="relative inline-block mob-h1 pr-4 1440:web-h1 1440:pr-6">
        <p className="w-[5px] h-[50px] [background-image:var(--color-gradient-02)] rounded-tl-full rounded-tr-full absolute top-0 right-0 1440:h-[70px]" />
        <p className="bg-clip-text text-transparent [background-image:var(--color-gradient-05)]">
          {title}
        </p>
      </span>

      <p className="absolute bottom-0 left-0 w-full h-0.5 bg-yile-200 rounded-full" />

      {children}
    </h3>
  )
}

export { CategoryTitle, CategoryTitleBox }
