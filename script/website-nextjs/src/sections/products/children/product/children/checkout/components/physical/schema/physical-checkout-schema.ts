import { z } from 'zod'
import commonBaseSchema from '../../schema/common-schema'
import { DELIVERY_METHOD } from '@/constants/delivery-method'

export const defaultValues = {
  customName: '',
  customPhone: '',
  customCityPhone: '',
  customEmail: '',
  customCity: '',
  customDistrict: '',
  customAddress: '',
  // -----------------------------
  deliveryMethod: DELIVERY_METHOD.HOME_DELIVERY.Key,
  recipientName: '',
  recipientPhone: '',
  recipientCityPhone: '',
  recipientCity: '',
  recipientDistrict: '',
  recipientAddress: '',
}

export const baseSchema = commonBaseSchema.extend({
  deliveryMethod: z.string().trim().min(1, '請選擇寄送方式'),
  recipientName: z.string().trim().min(1, '此欄位為必填').max(64, '收件人姓名不得超過 64 個字'),
  recipientPhone: z
    .string()
    .trim()
    .min(1, '此欄位為必填')
    .regex(/^(\d{10}|09\d{8})$/, '輸入格式錯誤'),
  recipientCityPhone: z
    .string()
    .trim()
    .regex(/^(?:02\d{8}|0[3-8]\d{7,8})$/, '市話格式為 9~10 碼')
    .optional()
    .or(z.literal('')),
  recipientCity: z.string().trim().min(1, '請選擇縣市'),
  recipientDistrict: z.string().trim().min(1, '請選擇地區'),
  recipientAddress: z
    .string()
    .trim()
    .min(5, '收件人地址至少需 5 個字')
    .max(200, '收件人地址不得超過 200 字'),
})

export type BaseSchemaType = z.input<typeof baseSchema>

export const formSchema = {
  defaultValues,
  baseSchema,
}
