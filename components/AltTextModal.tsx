'use client'

import { useState } from 'react'
import styles from './AltTextModal.module.css'

type Props = {
  isOpen: boolean
  onConfirm: (alt: string) => void
  onCancel: () => void
}

export function AltTextModal({ isOpen, onConfirm, onCancel }: Props) {
  const [alt, setAlt] = useState('')

  if (!isOpen) return null

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Vyplňte alternativní text</h3>
        <input
          className={styles.input}
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Popis obrázku (povinné)"
        />
        <div className={styles.actions}>
          <button className={styles.secondary} onClick={onCancel}>
            Zrušit
          </button>
          <button className={styles.primary} onClick={() => alt.trim() && onConfirm(alt.trim())}>
            Potvrdit
          </button>
        </div>
      </div>
    </div>
  )
}
