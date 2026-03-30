import z from 'zod'

// 基礎表單欄位
const commonBaseSchema = z.object({
  // 兌換人姓名
  customName: z.string().trim().min(1, '此欄位為必填').max(64, '姓名不得超過 64 個字'),
  customPhone: z
    .string()
    .trim()
    .min(1, '此欄位為必填')
    .regex(/^(\d{10}|09\d{8})$/, '輸入格式錯誤'),
  customCityPhone: z
    .string()
    .trim()
    .regex(/^(?:02\d{8}|0[3-8]\d{7,8})$/, '市話格式為 9~10 碼')
    .optional()
    .or(z.literal('')),
  customEmail: z.email('輸入格式錯誤'),
  customCity: z.string().min(1, '請選擇縣市'),
  customDistrict: z.string().min(1, '請選擇地區'),
  customAddress: z
    .string()
    .trim()
    .min(5, '兌換人地址至少需５個字')
    .max(200, '兌換人地址不得超過 200 字'),
})

export default commonBaseSchema
export type CommonSchemaType = z.infer<typeof commonBaseSchema>
