export type MediaItem = {
  id: number
  alt: string
  url?: string
  filename?: string
}

export type PageDoc = {
  id: number
  title: string
  slug: string
  heroHeadline: string
  heroSubheadline: string
  heroCtaText: string
  heroImage: MediaItem
  aboutHeading: string
  aboutBody: string
  aboutImage: MediaItem
}
