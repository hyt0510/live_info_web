import React from "react"
import type { Metadata, Viewport } from 'next'
import { Rajdhani, Orbitron } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _rajdhani = Rajdhani({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
const _orbitron = Orbitron({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: 'multi-orbit | Where Individual Paths Collide',
  description: 'それぞれの軌道が交差し、共鳴する場所。学園祭ライブイベント multi-orbit',
  icons: {
    icon: [
      {
        url: '/multi_orbit_icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/multi_orbit_icon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/multi_orbit_icon-dark.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/multi_orbit_icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000510',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
