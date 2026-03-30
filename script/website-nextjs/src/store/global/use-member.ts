import { create } from 'zustand'

export type Member = {
  id: string
  nickName: string
  name: string
  identityNumber: string
  phone: string
  cityPhone: string
  email: string
  birthday: number
  gender: string
  country: number
  district: number
  address: string
}

type MemberStore = {
  member: Member
  setMember: (partial: Partial<Member>) => void
  setId: (id: string) => void
  setNickName: (nickName: string) => void
  setName: (name: string) => void
  setIdentityNumber: (identityNumber: string) => void
  setPhone: (phone: string) => void
  setCityPhone: (cityPhone: string) => void
  setEmail: (email: string) => void
  setBirthday: (birthday: number) => void
  setGender: (gender: string) => void
  setCountry: (country: number) => void
  setDistrict: (country: number) => void
  setAddress: (address: string) => void
  reset: () => void
}

const initialState: Member = {
  id: '',
  nickName: '',
  name: '',
  identityNumber: '',
  phone: '',
  cityPhone: '',
  email: '',
  birthday: 0,
  gender: '',
  country: 0,
  district: 0,
  address: '',
}

const useMemberStore = create<MemberStore>((set) => ({
  member: initialState,
  setMember: (partial) => set((state) => ({ member: { ...state.member, ...partial } })),
  setId: (id) => set((state) => ({ member: { ...state.member, id } })),
  setNickName: (nickName) => set((state) => ({ member: { ...state.member, nickName } })),
  setName: (name) => set((state) => ({ member: { ...state.member, name } })),
  setIdentityNumber: (identityNumber) =>
    set((state) => ({ member: { ...state.member, identityNumber } })),
  setPhone: (phone) => set((state) => ({ member: { ...state.member, phone } })),
  setCityPhone: (cityPhone) => set((state) => ({ member: { ...state.member, cityPhone } })),
  setEmail: (email) => set((state) => ({ member: { ...state.member, email } })),
  setBirthday: (birthday) => set((state) => ({ member: { ...state.member, birthday } })),
  setGender: (gender) => set((state) => ({ member: { ...state.member, gender } })),
  setCountry: (country) => set((state) => ({ member: { ...state.member, country } })),
  setDistrict: (district) => set((state) => ({ member: { ...state.member, district } })),
  setAddress: (address) => set((state) => ({ member: { ...state.member, address } })),
  reset: () => set({ member: initialState }),
}))

export default useMemberStore
