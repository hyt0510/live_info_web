import React from "react"
import type { Metadata, Viewport } from 'next'
import { Rajdhani, Orbitron } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
  title: 'multi-orbit | 鈴鹿高専卒業ライブ 2026',
  description: '鈴鹿高専卒業ライブ multi-orbit - 2026年3月7日(土)・8日(日) 鈴鹿SOUNDSTAGEにて開催。Where Individual Paths Collide. 個々の軌道が交わる場所。',
  keywords: ['鈴鹿高専', '卒業ライブ', 'multi-orbit', '鈴鹿SOUNDSTAGE', '鈴鹿', 'ライブ', '音楽イベント', '2026', 'マルチオービット'],
  authors: [{ name: 'multi-orbit' }],
  openGraph: {
    title: 'multi-orbit | 鈴鹿高専卒業ライブ 2026',
    description: '鈴鹿高専卒業ライブ multi-orbit - 2026年3月7日(土)・8日(日) 鈴鹿SOUNDSTAGEにて開催',
    url: 'https://live-info-web.vercel.app',
    siteName: 'multi-orbit',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/multi_orbit_icon.png',
        width: 1200,
        height: 630,
        alt: 'multi-orbit 鈴鹿高専卒業ライブ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'multi-orbit | 鈴鹿高専卒業ライブ 2026',
    description: '鈴鹿高専卒業ライブ multi-orbit - 2026年3月7日(土)・8日(日)',
    images: ['/multi_orbit_icon.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/multi_orbit_icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/multi_orbit_icon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/multi_orbit_icon.png',
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CKGVQ7NYY3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CKGVQ7NYY3');
          `}
        </Script>
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}
