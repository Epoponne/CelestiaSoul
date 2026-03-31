import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CelestiaSOUL',
  description: 'Sacred Breath · Cosmic Alignment · Soul Awakening',
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