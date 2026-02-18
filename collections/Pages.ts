import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'heroHeadline', type: 'text', required: true },
    { name: 'heroSubheadline', type: 'text', required: true },
    { name: 'heroCtaText', type: 'text', required: true },
    { name: 'heroImage', type: 'relationship', relationTo: 'media', required: true },
    { name: 'aboutHeading', type: 'text', required: true },
    { name: 'aboutBody', type: 'textarea', required: true },
    { name: 'aboutImage', type: 'relationship', relationTo: 'media', required: true },
  ],
}
