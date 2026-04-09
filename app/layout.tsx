import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CelestiaSOUL — Sacred Breath · Cosmic Alignment · Soul Awakening',
  description: 'Personalized AI astrology readings, sacred breathwork, healing Solfeggio frequencies and moon rituals. Your cosmic sanctuary awaits.',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8A5AFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CelestiaSOUL" />
        <meta name="google-site-verification" content="VPz-OaThXHwGofN0h9GpKihuShfJ9-YALkq_owuRBV8" />
        <meta name="keywords" content="astrology readings, breathwork, solfeggio frequencies, healing frequencies, moon rituals, spiritual wellness, AI astrology, natal chart, cosmic alignment" />
        <meta property="og:title" content="CelestiaSOUL - Sacred Spiritual Wellness" />
        <meta property="og:description" content="Personalized AI astrology readings, sacred breathwork, healing Solfeggio frequencies and moon rituals." />
        <meta property="og:url" content="https://celestiasoul.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CelestiaSOUL - Sacred Spiritual Wellness" />
        <meta name="twitter:description" content="Personalized AI astrology readings, sacred breathwork, healing Solfeggio frequencies and moon rituals." />
      </head>
      <body style={{margin:0,padding:0,background:'#0D0B1E ',minHeight:'100vh',overflowX:'hidden'}}>
        {children}
      </body>
    </html>
  )
}
