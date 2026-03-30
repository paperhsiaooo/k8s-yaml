import { Metadata } from 'next'
import { CheckoutView } from '@/sections/products/children/product/children/checkout/view'
import { getProductDetail } from '@/apis/server/public/products/getProductDetail'
import { JSX } from 'react'
import { AuthGuard } from '@/auth/guard'

type PropsMeta = {
  params: Promise<{ productId: string }>
}

type PageProps = {
  params: Promise<{ productId: string }>
  searchParams: Promise<{ redeemHash: string; quantity: string }>
}

// 動態生成 metadata
export async function generateMetadata({ params }: PropsMeta): Promise<Metadata> {
  // 這裡可以根據 productId 獲取商品資訊
  try {
    const { productId } = await params
    const data = await getProductDetail(productId)

    return {
      title: `${data.name} - 兌換確認 | Pointory`,
      description: `${data.description}`,
      keywords: ['兌換', '獎勵', '商品', data.name],
      openGraph: {
        title: `${data.name}`,
        description: `${data.name}`,
        type: 'website',
        images: data.imageUrls[0],
      },
      robots: {
        index: false, // 兌換頁面通常不需要被搜尋引擎索引
        follow: true,
      },
    }
  } catch (error) {
    console.log('[generateMetadata] error: ', error)
    return {
      title: '商品詳情｜Pointory',
      description: '查看商品詳細資訊並進行兌換',
    }
  }
}

async function CheckoutPage({ params, searchParams }: PageProps): Promise<JSX.Element | null> {
  const { productId } = await params
  const { redeemHash, quantity } = await searchParams

  try {
    const data = await getProductDetail(productId)
    const formattedQuantity = Number(quantity)

    return (
      <AuthGuard>
        <CheckoutView
          redeemHash={redeemHash}
          productId={productId}
          type={data.type}
          imageUrl={data.imageUrls[0]}
          name={data.name}
          quantity={formattedQuantity}
          price={data.price}
          notes={data.notes}
          appCode={data.appCode}
        />
      </AuthGuard>
    )
  } catch {
    return <div>CheckoutPage Custom Not Found</div>
  }
}

export default CheckoutPage
