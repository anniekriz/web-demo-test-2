'use client'

import styles from './Header.module.css'

type Props = {
  isLoggedIn: boolean
  isEditMode: boolean
  isDirty: boolean
  isSaving: boolean
  onEdit: () => void
  onSave: () => void
  onExit: () => void
}

export function Header({ isLoggedIn, isEditMode, isSaving, onEdit, onSave, onExit }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Neo World Weby</div>
        <div className={styles.actions}>
          {isLoggedIn && !isEditMode && (
            <button className={styles.primary} onClick={onEdit}>
              Edit
            </button>
          )}
          {isLoggedIn && isEditMode && (
            <>
              <button className={styles.primary} onClick={onSave} disabled={isSaving}>
                {isSaving ? 'Ukládám…' : 'Uložit'}
              </button>
              <button className={styles.secondary} onClick={onExit}>
                Exit
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
