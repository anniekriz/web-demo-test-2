'use client'

import { useEffect, useMemo, useState } from 'react'
import { AboutSection } from './AboutSection'
import { Header } from './Header'
import { HeroSection } from './HeroSection'
import styles from './PageEditor.module.css'
import { PageDoc } from '@/lib/types'
import { PendingUpload } from './EditableImage'

type Props = {
  initialPage: PageDoc
}

type MeResponse = {
  user?: {
    id: number
    role?: 'admin' | 'editor' | 'viewer'
  } | null
}

function areEqual(a: PageDoc, b: PageDoc) {
  return JSON.stringify(a) === JSON.stringify(b)
}

function canUserEdit(role?: 'admin' | 'editor' | 'viewer') {
  return role === 'admin' || role === 'editor'
}

export function PageEditor({ initialPage }: Props) {
  const [original, setOriginal] = useState<PageDoc>(initialPage)
  const [draft, setDraft] = useState<PageDoc>(initialPage)
  const [isEditMode, setEditMode] = useState(false)
  const [canEdit, setCanEdit] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedNotice, setSavedNotice] = useState(false)
  const [heroUpload, setHeroUpload] = useState<PendingUpload | null>(null)
  const [aboutUpload, setAboutUpload] = useState<PendingUpload | null>(null)

  const isDirty = useMemo(() => !areEqual(original, draft) || Boolean(heroUpload) || Boolean(aboutUpload), [original, draft, heroUpload, aboutUpload])

  useEffect(() => {
    async function loadMe() {
      try {
        const res = await fetch('/api/users/me', { credentials: 'include' })
        if (!res.ok) {
          setCanEdit(false)
          return
        }

        const data = (await res.json()) as MeResponse
        setCanEdit(canUserEdit(data.user?.role))
      } catch {
        setCanEdit(false)
      }
    }

    void loadMe()
  }, [])

  const updateField = (field: keyof PageDoc, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }))
  }

  const uploadMedia = async (pending: PendingUpload) => {
    const formData = new FormData()
    formData.append('file', pending.file)
    formData.append('alt', pending.alt)

    const res = await fetch('/api/media', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    if (!res.ok) throw new Error('Upload obrázku selhal.')
    const data = await res.json()
    return data.doc
  }

  const handleSave = async () => {
    if (!canEdit) {
      setError('Nemáte oprávnění pro uložení změn.')
      return
    }

    setSaving(true)
    setError(null)
    try {
      let heroImage = draft.heroImage
      let aboutImage = draft.aboutImage

      if (heroUpload) {
        const uploaded = await uploadMedia(heroUpload)
        heroImage = { id: uploaded.id, alt: uploaded.alt, url: uploaded.url }
      }

      if (aboutUpload) {
        const uploaded = await uploadMedia(aboutUpload)
        aboutImage = { id: uploaded.id, alt: uploaded.alt, url: uploaded.url }
      }

      const payload = {
        title: draft.title,
        slug: draft.slug,
        heroHeadline: draft.heroHeadline,
        heroSubheadline: draft.heroSubheadline,
        heroCtaText: draft.heroCtaText,
        heroImage: heroImage.id,
        aboutHeading: draft.aboutHeading,
        aboutBody: draft.aboutBody,
        aboutImage: aboutImage.id,
      }

      const res = await fetch(`/api/pages/${draft.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Uložení stránky selhalo.')
      const data = await res.json()
      const saved: PageDoc = {
        ...draft,
        ...data.doc,
        heroImage,
        aboutImage,
      }

      setOriginal(saved)
      setDraft(saved)
      setHeroUpload(null)
      setAboutUpload(null)
      setSavedNotice(true)
      setTimeout(() => setSavedNotice(false), 1500)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Nastala chyba')
    } finally {
      setSaving(false)
    }
  }

  const handleExit = () => {
    if (isDirty) {
      const confirmed = window.confirm('Máte neuložené změny. Opravdu chcete odejít bez uložení?')
      if (!confirmed) return
    }

    setDraft(original)
    setHeroUpload(null)
    setAboutUpload(null)
    setEditMode(false)
    setError(null)
  }

  return (
    <div className={styles.page}>
      <Header
        canEdit={canEdit}
        isEditMode={isEditMode}
        isDirty={isDirty}
        isSaving={isSaving}
        onEdit={() => setEditMode(true)}
        onSave={handleSave}
        onExit={handleExit}
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <HeroSection
            headline={draft.heroHeadline}
            subheadline={draft.heroSubheadline}
            ctaText={draft.heroCtaText}
            image={draft.heroImage}
            editable={isEditMode && canEdit}
            onChange={updateField as (field: 'heroHeadline' | 'heroSubheadline' | 'heroCtaText', value: string) => void}
            pendingUpload={heroUpload}
            setPendingUpload={setHeroUpload}
          />
          <AboutSection
            heading={draft.aboutHeading}
            body={draft.aboutBody}
            image={draft.aboutImage}
            editable={isEditMode && canEdit}
            onChange={updateField as (field: 'aboutHeading' | 'aboutBody', value: string) => void}
            pendingUpload={aboutUpload}
            setPendingUpload={setAboutUpload}
          />
          {error && <p className={styles.error}>{error}</p>}
          {savedNotice && <div className={styles.saved}>Uloženo</div>}
        </div>
      </main>
      <footer className={styles.footer}>© {new Date().getFullYear()} Neo World Weby</footer>
    </div>
  )
}
