import { z } from 'zod'

export const defaultValues = {
  memberId: '',
  nickname: '',
  fullName: '',
  birthday: 0,
  gender: '',
  email: '',
  phone: '',
  city: '',
  cityPhone: '',
  district: '',
  address: '',
}

export const baseSchema = z.object({
  memberId: z.string().trim().min(1, '請選擇寄送方式'),
  nickname: z.string().trim().min(1, '暱稱不得為空'),
  fullName: z
    .string()
    .trim()
    .min(1, '真實姓名不得為空')
    .regex(/^[\p{Script=Han}]+$/u, '真實姓名僅能為中文'),
  birthday: z.number().optional().nullable(),
  gender: z.string().trim().optional().nullable(),
  email: z.email('請輸入正確的 Email 格式').trim(),
  phone: z
    .string()
    .trim()
    .min(1, '手機不得為空')
    .regex(/^(\d{10}|09\d{8})$/, '請輸入正確的號碼格式'),
  cityPhone: z
    .string()
    .trim()
    .regex(/^(?:02\d{8}|0[3-8]\d{7,8})$/, '市話格式為 9~10 碼')
    .optional()
    .or(z.literal('')),
  city: z.string().trim().min(1, '請選擇縣市'),
  district: z.string().trim().min(1, '請選擇地區'),
  address: z.string().trim().min(1, '地址不得為空'),
})

export type BaseSchemaType = z.input<typeof baseSchema>

export const formSchema = {
  defaultValues,
  baseSchema,
}
