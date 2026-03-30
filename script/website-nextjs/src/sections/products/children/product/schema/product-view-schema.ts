import { z } from 'zod'

export const defaultValues = {
  quantity: '',
}

export const baseSchema = z.object({
  quantity: z.string().min(1, '請選擇數量'),
})

export type BaseSchemaType = z.input<typeof baseSchema>

export const formSchema = {
  defaultValues,
  baseSchema,
}
