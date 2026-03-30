import { z } from 'zod'

export const MembersPrefix = 'members'

// ----------------------------------------------------------------------

export const MembersResSchema = z.object({
  memberId: z.string(),
  nickName: z.string(),
  name: z.string(),
  phone: z.string(),
  cityPhone: z.string(),
  email: z.string(),
  birthday: z.number(),
  gender: z.string(),
  country: z.number(),
  district: z.number(),
  address: z.string(),
})

export type MembersResType = z.infer<typeof MembersResSchema>

// ----------------------------------------------------------------------

export const MembersAppAccountResSchema = z.array(
  z.object({
    appCode: z.string(),
    appMemberId: z.string(),
    vip: z.string().nullable(),
    level: z.number().nullable(),
    nickName: z.string().nullable(),
    avatarUrl: z.string().nullable(),
  })
)

export type MembersAppAccountResType = z.infer<typeof MembersAppAccountResSchema>

export const GET_MEMBERS_APP_ACCOUNT_RES_DEFAULT: MembersAppAccountResType = []

// ----------------------------------------------------------------------

export const ModifyMemberInformationReqSchema = z.object({
  nickname: z.string().nullable(),
  fullName: z.string(),
  birthday: z.number().optional().nullable(),
  gender: z.string().nullable(),
  email: z.string(),
  cityPhone: z.string().nullable(),
  city: z.number(),
  district: z.number(),
  address: z.string(),
})

export type ModifyMemberInformationReqType = z.infer<typeof ModifyMemberInformationReqSchema>

export const ModifyMemberInformationResSchema = z.null()

export type ModifyMemberInformationResType = z.infer<typeof ModifyMemberInformationResSchema>
