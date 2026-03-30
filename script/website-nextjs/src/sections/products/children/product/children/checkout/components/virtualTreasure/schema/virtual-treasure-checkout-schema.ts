import { z } from 'zod'
import commonBaseSchema from '../../schema/common-schema'

export const defaultValues = {
  customName: '',
  customPhone: '',
  customCityPhone: '',
  customEmail: '',
  customCity: '',
  customDistrict: '',
  customAddress: '',
  // -----------------------------
  userId: '',
}

export const baseSchema = commonBaseSchema.extend({
  userId: z.string().trim().min(1, '請選擇派發使用者'),
})

export type BaseSchemaType = z.input<typeof baseSchema>

export const formSchema = {
  defaultValues,
  baseSchema,
}
