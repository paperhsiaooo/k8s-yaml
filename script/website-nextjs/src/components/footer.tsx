import { CONFIG } from '@/config-global'
import { cn } from '@/lib/utils'
import { collectNavByScope } from '@/routes/path'
import { WithClassName } from '@/types/common'
import Link from 'next/link'
import { Fragment, memo } from 'react'

type Props = WithClassName

function Footer({ className }: Props) {
  const buttons = collectNavByScope('footer')

  return (
    <footer className={cn('relative', className)}>
      <div
        className="[background-image:url('/images/wave-02-375.webp')] 640:[background-image:url('/images/wave-02-640.webp')] 1440:[background-image:url('/images/wave-02-1440.webp')] 1920:[background-image:url('/images/wave-02-1920.webp')]
        absolute top-[-30px] 640:top-[-60px] 1440:top-[-116px] 1920:top-[-160px] left-0 right-0 w-full h-[30px] 640:h-[60px] 1440:h-[116px] 1920:h-[160px]
        bg-repeat bg-size-[auto_30px] 640:bg-size-[auto_60px] 1440:bg-size-[auto_116px] 1920:bg-size-[auto_160px]"
      />
      <div className="bg-yile-600 -mt-px">
        <div className="wrapper">
          <div className="py-5 1440:py-[30px]">
            <div className="flex flex-col gap-2.5 mb-5 1440:flex-row 1440:justify-between 1440:mb-[30px]">
              <p className="mob-text-bold-01 text-yile-200 1440:web-text-bold-01">
                服務信箱：
                <a
                  className="underline underline-offset-2"
                  href={`mailto:${CONFIG.site.serviceEmail}`}
                >
                  {CONFIG.site.serviceEmail}
                </a>
              </p>

              <div className="flex flex-row gap-2 xl:flex-row">
                {buttons.map((button, index) => (
                  <Fragment key={button.title}>
                    <div>
                      <Link
                        className="inline-block mob-text-bold-01 text-yile-200 1440:web-text-bold-01"
                        href={button.href}
                      >
                        {button.title}
                      </Link>
                    </div>
                    <div
                      className={cn(
                        'relative w-[2px] h-4 top-[5px] bg-yile-200 mx-0.5 1440:h-5 1440:mx-1',
                        index === buttons.length - 1 && 'hidden'
                      )}
                    />
                  </Fragment>
                ))}
              </div>
            </div>

            <div>
              <p className="mob-text-small text-yile-300 1440:web-text-bold-01">
                {CONFIG.site.copyright}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
