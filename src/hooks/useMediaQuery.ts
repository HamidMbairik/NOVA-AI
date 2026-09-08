import { useState, useEffect } from 'react'

const MOBILE = '(max-width: 767px)'
const TABLET = '(min-width: 768px) and (max-width: 1023px)'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the viewport is a phone (max-width: 767px). */
export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE)
}

/** True when the viewport is a tablet (768px–1023px). */
export function useIsTablet(): boolean {
  return useMediaQuery(TABLET)
}

/** True when 3D-heavy effects should drop to their lightest form. */
export function useIsLowPower(): boolean {
  const mobile = useIsMobile()
  return mobile
}