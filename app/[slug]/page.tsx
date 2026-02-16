import { notFound } from 'next/navigation'
import { fetchPageBySlug } from '@/lib/api'
import { PageEditor } from '@/components/PageEditor'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const page = await fetchPageBySlug(slug)

  if (!page) notFound()

  return <PageEditor initialPage={page} />
}
