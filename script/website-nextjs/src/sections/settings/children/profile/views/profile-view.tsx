'use client'

import FormProvider from '@/components/custom/hook-form/form-provider'
import { Label } from '@/components/ui/label'
import useProfile from '../hook/use-profile'
import BindingInformation from './binding-information'
import RHFRadioButton from '@/components/custom/hook-form/rhf-radio-button'
import useRegions from '@/hooks/use-regions'
import RHFTitle from '@/components/custom/hook-form/rhf-title'
import { Button } from '@/components/ui/button'
import Loading from '@/components/custom/loading'
import { useMemo } from 'react'
import CommonRHFTextField from '@/components/custom/hook-form/common/rhf-textfield'
import CommonRHFSelect from '@/components/custom/hook-form/common/rhf-select'
import CommonRHFDatePicker from '@/components/custom/hook-form/common/rhf-date-picker'
import { CategoryTitle, CategoryTitleBox } from '@/sections/settings/components/category-title'

function ProfileView() {
  const {
    methods,
    city,
    memberAppAccount,
    isPendingModifyMemberInformation,
    isPendingMemberInfo,
    isPendingMemberAppAccount,
    handleCityChange,
    handleDistrictChange,
    handleSubmit,
    onSubmit,
  } = useProfile()
  const { counties, districts } = useRegions({ customCity: city })

  const renderFormBlock = useMemo(() => {
    if (isPendingMemberInfo) {
      return <Loading />
    }

    return (
      <FormProvider
        className="grid grid-cols-1 gap-4"
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-4 1440:grid-cols-2">
          <div className="flex flex-col gap-1">
            <RHFTitle
              htmlFor="memberId"
              string="會員 ID"
              required
              className="mob-text 1440:text-text"
            />
            <CommonRHFTextField name="memberId" placeholder="請輸入會員 ID" disabled />
          </div>

          <div className="flex flex-col gap-1">
            <RHFTitle
              htmlFor="nickname"
              string="帳號暱稱"
              required
              className="mob-text 1440:text-text"
            />
            <CommonRHFTextField name="nickname" placeholder="請輸入帳號暱稱" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 1440:grid-cols-2">
          <div className="flex flex-col gap-1">
            <RHFTitle
              htmlFor="fullName"
              string="真實姓名"
              required
              className="mob-text 1440:text-text"
            />
            <CommonRHFTextField name="fullName" placeholder="請輸入真實姓名" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 1440:grid-cols-2">
          <div className="flex flex-col gap-1">
            <RHFTitle htmlFor="birthday" string="生日" className="mob-text 1440:text-text" />
            <CommonRHFDatePicker
              name="birthday"
              placeholder="請選擇生日"
              minDate={new Date('1900-01-01')}
              maxDate={new Date()}
            />
          </div>

          <div className="flex flex-col gap-2">
            <RHFTitle string="性別" className="mob-text 1440:text-text" />
            <div className="flex flex-row items-center gap-x-3 1440:pt-1.5">
              <div className="flex flex-row items-center gap-x-1 sm:gap-x-2">
                <RHFRadioButton
                  id="male"
                  name="gender"
                  value="male"
                  disabled={false}
                  className="w-4 border-gray-300 before:bg-yile-600 sm:w-5"
                />
                <Label htmlFor="male" className="cursor-pointer mob-text 1440:text-text">
                  男生
                </Label>
              </div>
              <div className="flex flex-row items-center gap-x-1 sm:gap-x-2">
                <RHFRadioButton
                  id="female"
                  name="gender"
                  value="female"
                  disabled={false}
                  className="w-4 border-gray-300 before:bg-yile-600 sm:w-5"
                />
                <Label htmlFor="female" className="cursor-pointer mob-text 1440:text-text">
                  女生
                </Label>
              </div>
              <div className="flex flex-row items-center gap-x-1 sm:gap-x-2">
                <RHFRadioButton
                  id="other"
                  name="gender"
                  value="other"
                  disabled={false}
                  className="w-4 border-gray-300 before:bg-yile-600 sm:w-5"
                />
                <Label htmlFor="other" className="cursor-pointer mob-text 1440:text-text">
                  不願透露
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 1440:grid-cols-2">
          <div className="flex flex-col gap-1">
            <RHFTitle
              htmlFor="email"
              string="電子郵件"
              required
              className="mob-text 1440:text-text"
            />
            <CommonRHFTextField name="email" placeholder="請輸入電子郵件" />
          </div>

          <div className="flex flex-col gap-1">
            <RHFTitle
              htmlFor="phone"
              string="手機號碼"
              required
              className="mob-text 1440:text-text"
            />
            <CommonRHFTextField
              name="phone"
              placeholder="請輸入手機"
              type="tel"
              inputMode="numeric"
              disabled
            />
          </div>

          <div className="flex flex-col gap-1">
            <RHFTitle htmlFor="cityPhone" string="市話" className="mob-text 1440:text-text" />
            <CommonRHFTextField name="cityPhone" placeholder="請輸入市話" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <RHFTitle
            htmlFor="address"
            string="聯絡地址"
            required
            className="mob-text 1440:text-text"
          />
          <div className="grid grid-cols-1 gap-2 1440:grid-cols-3 1440:gap-4">
            <CommonRHFSelect
              name="city"
              placeholder="請選擇縣市"
              options={counties}
              onValueChange={handleCityChange}
              className="w-full"
            />
            <CommonRHFSelect
              name="district"
              placeholder="請選擇地區"
              options={districts}
              onValueChange={handleDistrictChange}
              className="w-full"
            />
            <CommonRHFTextField name="address" placeholder="請輸入詳細地址" />
          </div>
        </div>

        <Button
          disabled={isPendingModifyMemberInformation}
          size={'default'}
          className="w-full bg-yile-500 cursor-pointer hover:bg-yile-600 1440:max-w-32"
        >
          {isPendingModifyMemberInformation ? '儲存中...' : '儲存'}
        </Button>
      </FormProvider>
    )
  }, [
    counties,
    districts,
    methods,
    isPendingMemberInfo,
    isPendingModifyMemberInformation,
    handleCityChange,
    handleDistrictChange,
    handleSubmit,
    onSubmit,
  ])

  const renderBindingInformation = useMemo(() => {
    if (isPendingMemberAppAccount) {
      return <Loading />
    }

    return <BindingInformation list={memberAppAccount} />
  }, [isPendingMemberAppAccount, memberAppAccount])

  return (
    <div className="setting-panel-wrap">
      <div className="setting-panel-frame">
        <CategoryTitleBox>
          <CategoryTitle title="會員資料" />
        </CategoryTitleBox>

        <div className="flex flex-col px-4 pb-4 640:px-6 640:pb-6 1440:px-[74px] 1440:pb-16">
          {renderFormBlock}
          <div className="mt-2.5 1440:mt-10">{renderBindingInformation}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileView
