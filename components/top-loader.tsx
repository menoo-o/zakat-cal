'use client'

import { useEffect } from 'react'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
import { usePathname, useSearchParams } from 'next/navigation'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 120,
  minimum: 0.08,
})

export default function TopLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      const anchor = target.closest('a')

      if (!anchor) return

      const href = anchor.getAttribute('href')

      if (!href) return

      // Ignore:
      // external links
      // same-page hashes
      // new tab links
      // downloads
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return
      }

      NProgress.start()
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return null
}