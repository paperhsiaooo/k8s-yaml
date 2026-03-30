export const dynamic = 'force-dynamic'
import { ProductsView } from '@/sections/products/views'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '商品列表 - 積分兌換商品',
  description:
    '瀏覽豐富的積分兌換商品，包含生活用品、3C產品、美食券等。使用您的積分兌換心儀商品，讓積分更有價值！',
  keywords: ['商品列表', '積分兌換', '商品兌換', '點數購物', '積分商品', '兌換商品'],
  alternates: {
    canonical: 'https://808bonus.com.tw/products',
  },
  openGraph: {
    title: '商品列表 - 積分兌換商品',
    description: '瀏覽豐富的積分兌換商品，使用您的積分兌換心儀商品！',
    url: 'https://808bonus.com.tw/products',
    type: 'website',
    images: [
      {
        url: '/images/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Pointory 商品列表',
      },
    ],
  },
}

function ProductPage() {
  return <ProductsView />
}

export default ProductPage
