import FormProvider from '@/components/custom/hook-form/form-provider'
import useVirtualTreasureCheckout from './hook/use-virtual-treasure-checkout'
import RedeemerInfo from '../redeemer-info'
import ShippingInfo from './sections/shipping-info'
import Button1 from '@/components/custom/button/button1'
import { PiArrowCircleRightBold } from 'react-icons/pi'

type Props = {
  productId: string
  redeemHash: string
  imageUrl: string
  name: string
  quantity: number
  price: number
  notes: string
  appCode: string
}

function VirtualTreasureCheckoutView({
  productId,
  redeemHash,
  imageUrl,
  name,
  quantity,
  price,
  notes,
  appCode,
}: Props) {
  const {
    methods,
    customCity,
    selectedUserId,
    appAccounts,
    disabledSubmitButton,
    handleCustomCityChange,
    handleCustomDistrictChange,
    handleSubmit,
    onSubmit,
  } = useVirtualTreasureCheckout({ productId, redeemHash, appCode })

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="1440:pt-20">
      {/* 兌換人資訊區塊 */}
      <RedeemerInfo
        disabled={disabledSubmitButton}
        customCity={customCity}
        handleCustomCityChange={handleCustomCityChange}
        handleCustomDistrictChange={handleCustomDistrictChange}
      />

      {/* 虛擬獎品派發區塊 */}
      <ShippingInfo
        disabled={disabledSubmitButton}
        imageUrl={imageUrl}
        name={name}
        quantity={quantity}
        price={price}
        notes={notes}
        selectedUserId={selectedUserId}
        appAccounts={appAccounts}
      />

      <Button1
        type="submit"
        isLoading={disabledSubmitButton}
        className={`
          max-w-xs
          mx-auto
          px-6
          py-3
          gap-x-4
          border-4
          1440:max-w-none
          1440:px-12
          1440:py-6`}
      >
        <p className="text-yile-950 mob-button-small 1440:web-button-bold">確認兌換</p>
        <PiArrowCircleRightBold className="text-2xl text-yile-950 1440:text-5xl" />
      </Button1>
    </FormProvider>
  )
}

export default VirtualTreasureCheckoutView
