import { Badge } from '@/components/ui/badge'
import { formatISO9075 } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  newId: string
  title: string
  date: number
  category: string
  imgUrl: string
}

function NewsCard({ newId, title, date, category, imgUrl }: Props) {
  return (
    <article>
      <Link href={`/news/${newId}`}>
        <div className="flex flex-col gap-y-2">
          <div className="relative aspect-[300/200] w-full">
            <Image src={imgUrl} alt={title} fill className="object-cover" />
          </div>

          <div className="flex justify-start items-center gap-x-1">
            {/* category */}
            <Badge variant="default" className="bg-amber-400 text-gray-700">
              {category}
            </Badge>

            <p className="text-gray-500">
              {formatISO9075(new Date(date), { representation: 'date' })}
            </p>
          </div>

          <p className="text-gray-500">{title}</p>
        </div>
      </Link>
    </article>
  )
}

export default NewsCard
