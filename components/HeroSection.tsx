'use client'

import { EditableImage, PendingUpload } from './EditableImage'
import { EditableText } from './EditableText'
import styles from './HeroSection.module.css'
import { MediaItem } from '@/lib/types'

type Props = {
  headline: string
  subheadline: string
  ctaText: string
  image: MediaItem
  editable: boolean
  onChange: (field: 'heroHeadline' | 'heroSubheadline' | 'heroCtaText', value: string) => void
  pendingUpload: PendingUpload | null
  setPendingUpload: (pending: PendingUpload | null) => void
}

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  image,
  editable,
  onChange,
  pendingUpload,
  setPendingUpload,
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.textCol}>
        <h1 className={styles.title}>
          <EditableText value={headline} onChange={(v) => onChange('heroHeadline', v)} editable={editable} className={styles.title} />
        </h1>
        <p className={styles.subtitle}>
          <EditableText
            value={subheadline}
            onChange={(v) => onChange('heroSubheadline', v)}
            editable={editable}
            className={styles.subtitle}
          />
        </p>
        <button className={styles.cta}>
          <EditableText value={ctaText} onChange={(v) => onChange('heroCtaText', v)} editable={editable} className={styles.ctaLabel} />
        </button>
      </div>
      <EditableImage
        value={image}
        editable={editable}
        label="Hero obrázek"
        onUploadReady={setPendingUpload}
        pendingUpload={pendingUpload}
      />
    </section>
  )
}
