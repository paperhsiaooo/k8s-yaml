import Image from 'next/image'

type Props = {
  imageUrl: string | null
  title: string
  description: string | null
  price: number
  quantity: number
}

function DeliveryItem({ imageUrl, title, description, price, quantity }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
      {/* 獎品圖片 */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-500 text-sm">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} width={80} height={80} />
          ) : (
            <span className="text-gray-500 text-sm">圖片</span>
          )}
        </span>
      </div>

      {/* 獎品資訊 */}
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-sm text-gray-600 mt-1">{`${price} 發點`}</p>
      </div>

      {/* 數量 */}
      <div className="w-16 text-left">
        <span className="font-medium text-gray-800">{`${quantity} 個`}</span>
      </div>
    </div>
  )
}

export default DeliveryItem
