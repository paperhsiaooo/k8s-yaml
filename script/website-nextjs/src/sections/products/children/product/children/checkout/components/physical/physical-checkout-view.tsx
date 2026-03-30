import FormProvider from '@/components/custom/hook-form/form-provider'
import RedeemerInfo from '@/sections/products/children/product/children/checkout/components/redeemer-info'
import ShippingInfo from '@/sections/products/children/product/children/checkout/components/physical/sections/shipping-info'
import usePhysicalCheckout from './hook/use-physical-checkout'
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
}

function PhysicalCheckoutView({
  productId,
  redeemHash,
  imageUrl,
  name,
  quantity,
  price,
  notes,
}: Props) {
  const {
    methods,
    customCity,
    recipientCity,
    disabledSubmitButton,
    handleCustomCityChange,
    handleCustomDistrictChange,
    handleRecipientCityChange,
    handleRecipientDistrictChange,
    handleShippingAutoFillCustomMemberInfoChange,
    handleSubmit,
    onSubmit,
  } = usePhysicalCheckout({
    productId,
    redeemHash,
  })

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="1440:pt-20">
      {/* 兌換人資訊區塊 */}
      <RedeemerInfo
        disabled={disabledSubmitButton}
        customCity={customCity}
        handleCustomCityChange={handleCustomCityChange}
        handleCustomDistrictChange={handleCustomDistrictChange}
      />

      {/* 實體獎品寄送區塊 */}
      <ShippingInfo
        disabled={disabledSubmitButton}
        imageUrl={imageUrl}
        name={name}
        quantity={quantity}
        price={price}
        city={recipientCity}
        notes={notes}
        handleShippingAutoFillCustomMemberInfoChange={handleShippingAutoFillCustomMemberInfoChange}
        handleRecipientCityChange={handleRecipientCityChange}
        handleRecipientDistrictChange={handleRecipientDistrictChange}
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

export default PhysicalCheckoutView
