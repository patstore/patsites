import { useEffect, useRef, type RefObject } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useLayoutStore from './useLayoutStore'


export function useSmoothScroll(
  viewportRef: RefObject<HTMLDivElement | null>,
  contentRef: RefObject<HTMLDivElement | null>
) {
  const lenisRef = useRef<Lenis | null>(null)
  const { setScrollPosition, setScrollHeight, setScrollTo } = useLayoutStore()

  useEffect(() => {
    const viewport = viewportRef.current
    const content = contentRef.current
    if (!viewport || !content) return

    const updateScrollHeight = () => {
      setScrollHeight(content.scrollHeight)
    }

    const resizeObserver = new ResizeObserver(updateScrollHeight)
    resizeObserver.observe(content)
    updateScrollHeight()

    const lenis = new Lenis({
      wrapper: viewport,
      content,
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    })

    lenisRef.current = lenis

    lenis.on('scroll', (l) => {
      setScrollPosition(l.scroll)
      ScrollTrigger.update()
    })

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const scrollToPosition = (delta: number) => {
      const target = Math.max(0, Math.min(lenis.scroll + delta, lenis.limit))
      lenis.scrollTo(target, { programmatic: true })
    }

    setScrollTo(scrollToPosition)

    ScrollTrigger.scrollerProxy(viewport, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { programmatic: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return viewport.getBoundingClientRect()
      },
      scrollHeight: () => content.scrollHeight,
    })

    return () => {
      setScrollTo(null)
      gsap.ticker.remove(raf)
      resizeObserver.disconnect()
      lenis.destroy()
      lenisRef.current = null
      ScrollTrigger.scrollerProxy(viewport, {})
    }
  }, [viewportRef, contentRef, setScrollPosition, setScrollHeight, setScrollTo])
}
