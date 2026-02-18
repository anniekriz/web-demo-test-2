import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'dev-secret',
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } }),
  admin: {
    user: 'users',
  },
  collections: [Users, Media, Pages],
  upload: {
    limits: {
      fileSize: 5_000_000,
    },
  },
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
})
