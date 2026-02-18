'use client'

import { EditableImage, PendingUpload } from './EditableImage'
import { EditableText } from './EditableText'
import styles from './AboutSection.module.css'
import { MediaItem } from '@/lib/types'

type Props = {
  heading: string
  body: string
  image: MediaItem
  editable: boolean
  onChange: (field: 'aboutHeading' | 'aboutBody', value: string) => void
  pendingUpload: PendingUpload | null
  setPendingUpload: (pending: PendingUpload | null) => void
}

export function AboutSection({ heading, body, image, editable, onChange, pendingUpload, setPendingUpload }: Props) {
  return (
    <section className={styles.section}>
      <EditableImage
        value={image}
        editable={editable}
        label="O projektu obrázek"
        onUploadReady={setPendingUpload}
        pendingUpload={pendingUpload}
      />
      <div className={styles.textCol}>
        <h2 className={styles.heading}>
          <EditableText value={heading} onChange={(v) => onChange('aboutHeading', v)} editable={editable} className={styles.heading} />
        </h2>
        <p className={styles.body}>
          <EditableText value={body} onChange={(v) => onChange('aboutBody', v)} editable={editable} className={styles.body} multiline />
        </p>
      </div>
    </section>
  )
}
