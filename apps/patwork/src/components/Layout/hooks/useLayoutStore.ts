import { create } from 'zustand'

interface LayoutStore {
  mainWidth: number
  amountOfLines: number
  setMainWidth: (width: number) => void
  setAmountOfLines: (amount: number) => void
  scrollTo: ((delta: number) => void) | null
  setScrollTo: (scrollTo: ((delta: number) => void) | null) => void
  scrollPosition: number
  setScrollPosition: (position: number) => void
  scrollHeight: number
  setScrollHeight: (height: number) => void
  stopScroll: (() => void) | null
  startScroll: (() => void) | null
  setScrollControls: (stop: () => void, start: () => void) => void
}

const useLayoutStore = create<LayoutStore>((set) => ({
  mainWidth: 0,
  amountOfLines: 0,
  setMainWidth: (width: number) => set({ mainWidth: width }),
  setAmountOfLines: (amount: number) => set({ amountOfLines: amount }),
  scrollTo: null,
  setScrollTo: (scrollTo) => set({ scrollTo }),
  scrollPosition: 0,
  setScrollPosition: (position: number) => set({ scrollPosition: position }),
  scrollHeight: 0,
  setScrollHeight: (height: number) => set({ scrollHeight: height }),
  stopScroll: null,
  startScroll: null,
  setScrollControls: (stop, start) => set({ stopScroll: stop, startScroll: start }),
}))

export default useLayoutStore