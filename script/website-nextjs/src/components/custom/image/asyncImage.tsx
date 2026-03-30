'use client'

import { cn } from '@/lib/utils'
import { ImageOff, Loader2 } from 'lucide-react'
import { type ImageProps } from 'next/image'
import { type ReactNode, useState } from 'react'
import HybridImage, { HybridImageProps } from './hybridImage'

type AsyncImageProps = Omit<ImageProps, 'className' | 'alt'> & {
  /** 圖片替代文字，選填時預設為空字串 */
  alt?: string
  /** 是否顯示載入指示器 */
  withSkeleton?: boolean
  /** 自訂載入指示器；預設是旋轉的 Loader2 */
  loadingIndicator?: ReactNode
  /** 載入失敗時顯示的內容；預設是灰底加 ImageOff icon */
  errorFallback?: ReactNode
  /** wrapper div 的 className */
  wrapperClassName?: string
  /** Image 本身的 className（object-cover 等） */
  imageClassName?: string
  /** 圖片渲染模式；預設是 'default' */
  mode?: HybridImageProps['mode'] // 'default' | 'cdn'
}

function AsyncImage({
  mode = 'default',
  withSkeleton = true,
  loadingIndicator,
  errorFallback,
  wrapperClassName,
  imageClassName,
  onLoad,
  onError,
  ...imageProps
}: AsyncImageProps) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')

  const handleLoad: ImageProps['onLoad'] = (event) => {
    setState('loaded')
    onLoad?.(event)
  }

  const handleError: ImageProps['onError'] = (event) => {
    setState('error')
    onError?.(event)
  }

  const renderLoading = loadingIndicator ?? (
    <div
      role="status"
      aria-label="圖片載入中"
      className="absolute inset-0 flex items-center justify-center bg-gray-100"
    >
      <Loader2 className="size-6 animate-spin text-yile-700" />
    </div>
  )

  const renderError = errorFallback ?? (
    <div
      role="alert"
      aria-label="圖片載入失敗"
      className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500"
    >
      <ImageOff className="size-6" />
    </div>
  )

  return (
    <div className={cn('relative w-full h-full', wrapperClassName)}>
      {withSkeleton && state === 'loading' && renderLoading}
      {state === 'error' && renderError}
      <HybridImage
        mode={mode}
        {...imageProps}
        alt={imageProps.alt ?? ''}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(imageClassName, state === 'error' && 'opacity-0')}
      />
    </div>
  )
}

export default AsyncImage
