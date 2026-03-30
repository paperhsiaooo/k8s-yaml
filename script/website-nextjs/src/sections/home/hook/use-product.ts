import { paths } from '@/routes/path'
import { useRouter } from 'next/navigation'

function useProduct() {
  const router = useRouter()

  const handleMoreProductsClick = () => {
    router.push(paths.products.root)
  }
  return {
    handleMoreProductsClick,
  }
}

export default useProduct
