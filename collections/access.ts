import type { Access, PayloadRequest } from 'payload'

type AppUser = {
  id: number | string
  role?: 'admin' | 'editor' | 'viewer'
}

const getRole = (req: PayloadRequest): AppUser['role'] => {
  return (req.user as AppUser | null | undefined)?.role
}

export const isAdminOrEditor = ({ req }: { req: PayloadRequest }): boolean => {
  const role = getRole(req)
  return role === 'admin' || role === 'editor'
}

export const isAdmin: Access = ({ req }) => {
  return getRole(req) === 'admin'
}

export const isAdminOrSelf: Access = ({ req }) => {
  const user = req.user as AppUser | null | undefined
  if (!user) return false
  if (user.role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}
