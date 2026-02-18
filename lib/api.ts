import { PageDoc } from './types'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function fetchPageBySlug(slug: string): Promise<PageDoc | null> {
  const res = await fetch(`${baseUrl}/api/pages?where[slug][equals]=${slug}&depth=1&limit=1`, {
    cache: 'no-store',
  })

  if (!res.ok) return null

  const data = await res.json()
  return data.docs?.[0] ?? null
}
