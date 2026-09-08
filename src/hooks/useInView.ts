import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  /** Only fire once. */
  once?: boolean
  rootMargin?: string
}

/** Observes an element and reports when it enters the viewport. */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  once = true,
  rootMargin = '0px 0px -10% 0px',
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(() => {
    if (typeof window === 'undefined') return false
    if (typeof IntersectionObserver === 'undefined') return true
    return false
  })

  useEffect(() => {
    const node = ref.current
    // Unsupported environments already initialized inView to true.
    if (!node || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, once, rootMargin])

  return { ref, inView }
}