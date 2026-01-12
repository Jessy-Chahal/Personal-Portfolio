import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zyxify - Developer & Creator',
  description: 'Personal portfolio website showcasing projects, skills, and creative work',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
