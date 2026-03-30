'use client'

import { create } from 'zustand'

type EntryModeState = {
  isDragging: boolean
  setIsDragging: (drag: boolean) => void
}

export const useMouseModeStore = create<EntryModeState>((set) => ({
  isDragging: false,
  setIsDragging: (drag) => set({ isDragging: drag }),
}))
