import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    create: isAdmin,
    delete: isAdmin,
    admin: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
    },
  ],
}
