import config from '@/payload.config'
import { RootLayout } from '@payloadcms/next/layouts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return RootLayout({ children, config })
}
