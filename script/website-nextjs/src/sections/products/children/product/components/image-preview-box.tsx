'use client'

import AsyncImage from '@/components/custom/image/asyncImage'
import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import Image from 'next/image'
import { memo, useCallback, useState } from 'react'

type Props = WithClassName<{
  title: string
  imageUrls: string[]
  isAlmostSoldOut: boolean
}>

function ImagePreviewBox({ title, imageUrls, isAlmostSoldOut }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleImageSelected = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.dataset.index as string
    setSelectedIndex(Number(index))
  }, [])

  return (
    <div className="w-full flex flex-col gap-y-3 640:w-[248px] 1440:w-[550px] 1440:gap-4">
      <div className="relative aspect-square w-full">
        <div className="relative w-full h-full rounded-[42px] overflow-hidden 1440:rounded-[80px]">
          <AsyncImage
            mode="cdn"
            priority
            src={imageUrls[selectedIndex]}
            alt={`${title} 商品圖片`}
            fill
            imageClassName="object-cover"
          />
        </div>

        {/* 售罄 icon */}
        {isAlmostSoldOut && (
          <div className="absolute bottom-1 -right-2 w-24 aspect-[384/218] 1440:w-48 1440:bottom-auto 1440:-top-10 1440:right-0">
            <Image
              src={'/images/icons/icon-almost-sold-out.webp'}
              fill
              className="object-cover"
              alt={title}
            />
          </div>
        )}
      </div>
      {imageUrls.length > 1 && (
        <div className="flex flex-row justify-center gap-x-2 w-full 1440:gap-x-3">
          {imageUrls.map((imageUrl, index) => (
            <button
              key={`${imageUrl}-${index}`}
              type="button"
              data-index={index}
              onClick={handleImageSelected}
              className={cn(
                'relative transition-opacity hover:opacity-80',
                selectedIndex === index &&
                  'ring-4 ring-green-2 ring-offset-0 rounded-2xl 640:rounded-xl 1440:rounded-3xl'
              )}
            >
              <AsyncImage
                key={imageUrl}
                src={imageUrl}
                alt={`${title} 商品圖片 ${index + 1}`}
                mode="cdn"
                fill
                wrapperClassName="aspect-square rounded-2xl overflow-hidden w-[67px] cursor-pointer 640:w-[54px] 640:rounded-xl 1440:rounded-3xl 1440:w-[110px]"
                imageClassName="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(ImagePreviewBox)
