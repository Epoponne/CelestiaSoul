import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CelestiaSOUL',
  description: 'Sacred Breath · Cosmic Alignment · Soul Awakening',
  manifest: '/manifest.json',
  themeColor: '#8A5AFF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CelestiaSOUL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8A5AFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CelestiaSOUL" />
      </head>
      <body>{children}</body>
    </html>
  )
}
