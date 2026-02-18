'use client'

import styles from './EditableText.module.css'

type Props = {
  value: string
  onChange: (value: string) => void
  editable: boolean
  className?: string
  multiline?: boolean
}

export function EditableText({ value, onChange, editable, className, multiline = false }: Props) {
  if (!editable) {
    if (multiline) return <p className={className}>{value}</p>
    return <span className={className}>{value}</span>
  }

  return (
    <span
      className={`${className ?? ''} ${styles.editable}`.trim()}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent || '')}
      onInput={(e) => onChange(e.currentTarget.textContent || '')}
      data-multiline={multiline}
    >
      {value}
    </span>
  )
}
