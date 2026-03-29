'use client'

import { useEffect, useState } from 'react'
import type { CmsSiteContent } from '@/lib/cms/types'
import { defaultCmsContent } from '@/lib/cms/default-content'

export function useCmsContent() {
  const [content, setContent] = useState<CmsSiteContent>(defaultCmsContent)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const res = await fetch('/api/cms/public', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as CmsSiteContent
        if (mounted) setContent(data)
      } catch {
        // Keep defaults when fetch fails.
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  return content
}
