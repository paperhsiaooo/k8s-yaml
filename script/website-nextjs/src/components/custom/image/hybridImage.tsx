'use client'

import cdnLoader from '@/lib/loaders/cdn-loader'
import Image, { ImageProps } from 'next/image'

type ImageRenderMode = 'default' | 'cdn'

export interface HybridImageProps extends Omit<ImageProps, 'loader'> {
  mode?: ImageRenderMode
}

export default function HybridImage({ src, mode = 'default', ...props }: HybridImageProps) {
  if (mode === 'cdn') {
    return (
      <Image {...props} alt={props.alt ?? ''} src={src} unoptimized={true} loader={cdnLoader} />
    )
  }
  return <Image {...props} alt={props.alt ?? ''} src={src} />
}
