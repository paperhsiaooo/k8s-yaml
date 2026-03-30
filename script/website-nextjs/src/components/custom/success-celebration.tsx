import { cn } from '@/lib/utils'
import { WithClassName } from '@/types/common'
import Image from 'next/image'

type SuccessCelebrationProps = WithClassName<{
  title?: string
  description?: string
}>

function SuccessCelebration({ className }: SuccessCelebrationProps) {
  return (
    <div className={cn(className)}>
      {/* Text */}
      <div className="absolute z-20 left-1/2 -translate-x-1/2 top-0 translate-y-[110px] 640:translate-y-[125px] 1440:translate-y-[340px]">
        <p className="mob-h1 1440:web-h1 text-yile-900">兌換成功</p>
      </div>

      {/* Bear */}
      <div className="absolute z-20 w-24 right-0 top-0 translate-y-[70px] -translate-x-[20px] 640:w-32 640:translate-y-[50px] 640:-translate-x-[90px] 1440:w-[321px] 1440:translate-y-[200px] 1440:-translate-x-[230px]">
        <Image src={'/images/bear-01.webp'} width={642} height={712} alt="bear-01" />
      </div>

      {/* Bird */}
      <div className="absolute z-20 w-16 left-0 top-0 translate-y-[20px] translate-x-[60px] 640:w-24 640:translate-y-[10px] 640:translate-x-[130px] 1440:w-[185px] 1440:translate-y-[140px] 1440:translate-x-[370px]">
        <Image src={'/images/bird-01.webp'} width={372} height={344} alt="bird-01" />
      </div>

      {/* Success */}
      <div className="absolute z-20 w-28 left-1/2 top-0 -translate-x-1/2 translate-y-0 640:w-[120px] 1440:w-[240px] 1440:translate-y-[90px]">
        <Image src={'/images/success-01.webp'} width={480} height={480} alt="success-01" />
      </div>

      {/* Ribbons */}
      <div className="absolute z-10 w-[300px] left-0 top-0 translate-y-[5px] translate-x-[20px] 640:w-[400px] 640:translate-x-[80px] 1440:w-[600px] 1440:translate-x-[320px] 1440:translate-y-[100px]">
        <Image src={'/images/ribbons-01.webp'} width={1488} height={980} alt="ribbons-01" />
      </div>
    </div>
  )
}

export default SuccessCelebration
