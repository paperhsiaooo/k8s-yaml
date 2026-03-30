import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import IconPoint from '@/components/custom/icons/icon-point'
import { twMerge } from 'tailwind-merge'
import IconPlus from '@/components/custom/icons/icon-plus'
import { cn } from '@/lib/utils'
import { formatWithCommas } from '@/utils/number'
import { ABUNDANT_STOCK } from '@/constants/product-type'
import AsyncImage from '../image/asyncImage'

type ProductContainerProps = {
  link: string
  className?: string
  isDisabled?: boolean
  children: React.ReactNode
}

function ProductContainer({ link, className, isDisabled, children }: ProductContainerProps) {
  const merged = cn('inline-block', isDisabled && 'cursor-not-allowed', className)

  if (isDisabled) {
    return (
      <div className={merged} aria-disabled>
        {children}
      </div>
    )
  }

  return (
    <Link href={link} className={twMerge('inline-block', className)}>
      {children}
    </Link>
  )
}

type ProductContentProps = {
  name: string
  stock: number
  point: number
  imageUrl: string
  isDisabled?: boolean
  isAlmostSoldOut: boolean
}

function ProductContent({
  name,
  imageUrl,
  point,
  stock,
  isDisabled,
  isAlmostSoldOut,
}: ProductContentProps) {
  return (
    <div>
      <div className={cn('flex flex-col gap-y-1 1440:gap-y-2.5', !isDisabled && 'group')}>
        <div className="relative w-full">
          {/* 圖片 */}
          <div
            className={cn(
              'product-card-image',
              !isDisabled &&
                'group-hover:rounded-4xl group-active:rounded-[80px] 1440:group-hover:rounded-[80px] 1440:group-active:rounded-[80px]'
            )}
          >
            {imageUrl ? (
              <AsyncImage
                mode="cdn"
                src={imageUrl}
                alt={name}
                fill
                imageClassName="object-cover [will-change:filter] bg-black-1 group-hover:brightness-50 group-active:brightness-50 transition-[filter] duration-300"
              />
            ) : (
              <div className="w-full h-full bg-orange-300" />
            )}
            <IconPlus className="absolute flex items-center justify-center z-10 pointer-events-none size-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 640:size-8 1440:size-12" />
          </div>

          {/* Almost sold out icon */}
          {isAlmostSoldOut && !isDisabled && (
            <div className="absolute z-10 -bottom-2 -right-3 w-24 aspect-[384/218] 1440:w-48 1440:-right-10 1440:-bottom-3">
              <Image
                src={'/images/icons/icon-almost-sold-out.webp'}
                alt={name}
                width={384}
                height={218}
              />
            </div>
          )}

          {/* Sold out icon */}
          {isDisabled && (
            <>
              <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 aspect-square 1440:w-48">
                <Image
                  src={'/images/icons/icon-sold-out.webp'}
                  alt={name}
                  width={462}
                  height={462}
                />
              </div>
              <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black-1/50 rounded-xl 640:rounded-2xl 1440:rounded-4xl" />
              <p className="absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white border-yile-950 text-nowrap -rotate-12 mob-sold-out 1440:web-sold-out">
                已售完
              </p>
            </>
          )}
        </div>

        <div className="px-1 640:px-1">
          {/* 商品資訊 */}
          <div className="mb-1.5">
            <p className="mob-gift-h1-bold text-black-1 text-ellipsis overflow-hidden whitespace-nowrap mb-1 1440:web-gift-h1-bold 1440:mb-0">
              {name}
            </p>
            <p className="mob-text-small 1440:web-text text-gray">{stock === ABUNDANT_STOCK ? '庫存充足' : `剩餘${stock}個`}</p>
          </div>

          {/* 點數 */}
          <div className="flex flex-row items-center gap-x-1 640:gap-x-1 1440:gap-x-2.5">
            <IconPoint className="w-8 640:w-8 1440:w-8" />
            <p className="mob-em-small 1440:web-em-bold text-yile-700">{`${formatWithCommas(
              point
            )} 點`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Product = {
  Container: memo(ProductContainer),
  Content: memo(ProductContent),
}
