import { create } from 'zustand'

export type Auth = {
  isLogin: boolean
}

type AuthStore = {
  auth: Auth
  setAuth: (partial: Partial<Auth>) => void
  setIsLogin: (isLogin: boolean) => void
  reset: () => void
}

const initialState: Auth = {
  isLogin: false,
}

const useAuthStore = create<AuthStore>((set) => ({
  auth: initialState,
  setAuth: (partial) => set((state) => ({ auth: { ...state.auth, ...partial } })),
  setIsLogin: (isLogin) => set((state) => ({ auth: { ...state.auth, isLogin } })),
  reset: () => set({ auth: initialState }),
}))

export default useAuthStore
