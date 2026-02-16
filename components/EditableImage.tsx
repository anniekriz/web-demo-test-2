'use client'

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { AltTextModal } from './AltTextModal'
import styles from './EditableImage.module.css'

type ImageValue = {
  id: number
  alt: string
  url?: string
}

type PendingUpload = {
  file: File
  alt: string
  previewUrl: string
}

type Props = {
  value: ImageValue
  editable: boolean
  label: string
  onUploadReady: (pending: PendingUpload | null) => void
  pendingUpload: PendingUpload | null
}

export function EditableImage({ value, editable, label, onUploadReady, pendingUpload }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [queuedFile, setQueuedFile] = useState<File | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const imageSrc = useMemo(() => pendingUpload?.previewUrl || value.url || '/placeholder.jpg', [pendingUpload, value.url])

  return (
    <>
      <div className={styles.wrapper}>
        <Image src={imageSrc} alt={pendingUpload?.alt || value.alt || label} fill className={styles.image} />
        {editable && (
          <button className={styles.changeButton} onClick={() => inputRef.current?.click()}>
            Změnit obrázek
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          setQueuedFile(file)
          setModalOpen(true)
        }}
      />
      <AltTextModal
        isOpen={isModalOpen}
        onCancel={() => {
          setModalOpen(false)
          setQueuedFile(null)
        }}
        onConfirm={(alt) => {
          if (!queuedFile) return
          const previewUrl = URL.createObjectURL(queuedFile)
          onUploadReady({ file: queuedFile, alt, previewUrl })
          setModalOpen(false)
          setQueuedFile(null)
        }}
      />
    </>
  )
}

export type { PendingUpload }
