import { z } from 'zod'

export const AuthPrefix = 'auth'

// ----------------------------------------------------------------------

export const GetCsrfResSchema = z.object({
  csrfToken: z.string(),
})

export type GetCsrfResType = z.infer<typeof GetCsrfResSchema>

// ----------------------------------------------------------------------

export const LoginByTokenReqSchema = z.object({
  token: z.string(),
})

export type LoginByTokenReqType = z.infer<typeof LoginByTokenReqSchema>

export const LoginByTokenResSchema = z.string()

export type LoginByTokenResType = z.infer<typeof LoginByTokenResSchema>

// ----------------------------------------------------------------------

export const LoginByOneTimeTokenReqSchema = z.object({
  token: z.string(),
})

export type LoginByOneTimeTokenReqType = z.infer<typeof LoginByOneTimeTokenReqSchema>

export const LoginByOneTimeTokenResSchema = z.null()

export type LoginByOneTimeTokenResType = z.infer<typeof LoginByOneTimeTokenResSchema>

// ----------------------------------------------------------------------

export const CheckSessionReqSchema = z.null()

export type CheckSessionReqType = z.infer<typeof CheckSessionReqSchema>

export const CheckSessionResSchema = z.null()

export type CheckSessionResType = z.infer<typeof CheckSessionResSchema>
