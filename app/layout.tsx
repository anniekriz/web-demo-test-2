import './globals.css'

export const metadata = {
  title: 'Neo World Weby',
  description: 'Demo web s Next.js a Payload CMS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
