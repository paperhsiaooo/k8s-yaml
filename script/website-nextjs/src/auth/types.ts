// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UserType = Record<string, any> | null

export type AuthState = {
  user: UserType
  loading: boolean
}

export type AuthContextType = {
  user: UserType
  loading: boolean
  authenticated: boolean
  unauthenticated: boolean
  checkUserSession?: () => Promise<void>
}
