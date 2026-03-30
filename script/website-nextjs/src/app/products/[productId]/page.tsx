import { getProductDetail } from '@/apis/server/public/products/getProductDetail'
import { ProductView } from '@/sections/products/children/product/views'
import { Metadata } from 'next'
import Footer from '@/components/footer'
import { ServerApiFetchError } from '@/utils/server-api-fetch'
import ErrorPageRoot from '@/errorPage/errorPageRoot'

type Props = {
  params: Promise<{
    productId: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { productId } = await params
    // 獲取產品資料產生 metadata
    const data = await getProductDetail(productId)

    return {
      title: `${data.name} - 積分兌換商品`,
      description: `${data.description} 使用 ${data.price} 積分即可兌換，立即查看商品詳情並進行兌換！`,
      keywords: ['積分兌換', '商品兌換', data.name, '點數購物', '積分商品'],
      alternates: {
        canonical: `https://808bonus.com.tw/products/${productId}`,
      },
      openGraph: {
        title: `${data.name} - 積分兌換商品`,
        description: `${data.description} 使用 ${data.price} 積分即可兌換！`,
        url: `https://808bonus.com.tw/products/${productId}`,
        type: 'website',
        images: data.imageUrls[0]
          ? [
              {
                url: data.imageUrls[0],
                width: 1200,
                height: 630,
                alt: data.name,
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data.name} - 積分兌換商品`,
        description: `${data.description} 使用 ${data.price} 積分即可兌換！`,
        images: data.imageUrls[0] ? [data.imageUrls[0]] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch (error) {
    console.error('生成 metadata 失效：', error)
    return {
      title: '商品詳情｜Pointory',
      description: '查看商品詳細資訊並進行兌換',
      robots: {
        index: false,
        follow: true,
      },
    }
  }
}

export default async function Page({ params }: Props) {
  const { productId } = await params

  try {
    const data = await getProductDetail(productId)

    return (
      <>
        <ProductView
          title={data.name}
          description={data.description}
          imageUrls={data.imageUrls}
          point={data.price}
          stock={data.stock}
          countDown={10}
          introductions={data.details}
          notes={data.notes}
          productId={productId}
          snapshotId={data.snapshotId}
        />

        {/* pb 根據 fixed panel 高度 */}
        <Footer className="pb-[var(--fix-panel-height)] 640:pb-[var(--fix-panel-tablet-height)] 1440:pb-0" />
      </>
    )
  } catch (error) {
    const { httpStatus } = error as ServerApiFetchError
    console.error('[PageError] Page / httpStatus: ', httpStatus)

    return (
      <div className="h-full flex flex-col flex-1">
        <div className="flex-1 flex flex-col bg-yile-100 footer-padding">
          <div className="flex-1 flex justify-center items-center">
            <ErrorPageRoot httpStatus={httpStatus} />
          </div>
        </div>
        <Footer className="pb-[var(--fix-panel-height)] 640:pb-[var(--fix-panel-tablet-height)] 1440:pb-0" />
      </div>
    )
  }
}
