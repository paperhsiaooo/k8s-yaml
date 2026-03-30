import IconPoint from '@/components/custom/icons/icon-point'
import { FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

type ContainerProps = {
  link: string
  className?: string
  children: React.ReactNode
}

function Container({ link, className, children }: ContainerProps) {
  return (
    <Link href={link} className={twMerge('inline-block', className)}>
      {children}
    </Link>
  )
}

type ContentProps = {
  imageUrl: string
  title: string
  description: string
  point: number
}

function Content({ imageUrl, title, description, point }: ContentProps) {
  return (
    <div className="relative">
      <div className="rounded-[60px] overflow-hidden">
        {/* 圖片 */}
        <div className="relative w-full aspect-[469/264]">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-orange-300" />
          )}
        </div>

        {/* 內容 */}
        <div className="px-4 md:px-5 pt-4 md:pt-6 pb-8 md:pb-12 bg-yile-100 space-y-4 md:space-y-5">
          <p className="text-lg md:web-gift-h1-bold text-yile-950">{title}</p>
          <p className="text-sm md:web-text-01 text-yile-800">{description}</p>
        </div>
      </div>

      {/* 點數 */}
      <button className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full pl-6 bg-white flex items-center gap-x-2.5 cursor-pointer">
        <IconPoint className="w-5 md:w-7" />
        <p className="text-base md:web-em-bold text-black-1 whitespace-nowrap">{point}點</p>
        <p className="rounded-full shadow-lg bg-white w-10 h-10 md:w-[60px] md:h-[60px] flex items-center justify-center shadow-black-1/50">
          <FiArrowRight className="text-xl md:text-4xl" />
        </p>
      </button>
    </div>
  )
}

export const TaskCard = {
  Container: memo(Container),
  Content: memo(Content),
}

export default TaskCard
