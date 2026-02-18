import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from './access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
