'use client'

import { create } from 'zustand'

type EntryModeState = {
  isReady: boolean
  setReady: (ready: boolean) => void
}

export const useEntryModeStore = create<EntryModeState>((set) => ({
  isReady: false,
  setReady: (ready) => set({ isReady: ready }),
}))
