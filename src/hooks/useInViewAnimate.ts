import { RefObject, useEffect } from 'react'

interface UseInViewAnimateOptions {
  selector?: string
  rootMargin?: string
  threshold?: number
  once?: boolean
  reducedMotion?: boolean
  refreshKey?: string
}

export function useInViewAnimate(
  rootRef: RefObject<HTMLElement>,
  {
    selector = '[data-animate]',
    rootMargin = '0px 0px -10% 0px',
    threshold = 0,
    once = true,
    reducedMotion = false,
    refreshKey
  }: UseInViewAnimateOptions = {}
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const elements = Array.from(root.querySelectorAll<HTMLElement>(selector))
    if (elements.length === 0) return

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('reveal-visible'))
      return
    }

    // Only hide elements after animation support has been confirmed.
    elements.forEach((element) => element.classList.add('reveal-ready'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('reveal-visible')
          }
        })
      },
      { root: null, rootMargin, threshold }
    )

    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      elements.forEach((element) => element.classList.remove('reveal-ready'))
    }
  }, [once, reducedMotion, refreshKey, rootMargin, rootRef, selector, threshold])
}
