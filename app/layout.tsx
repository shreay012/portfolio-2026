import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shreaygoyal.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shreay Goyal — Senior Product Designer | UX Strategist',
    template: '%s | Shreay Goyal',
  },
  description:
    'Senior Product Designer with 8+ years of experience in SaaS, enterprise platforms, and AI-driven product experiences.',
  keywords: [
    'Senior Product Designer',
    'UX Strategist',
    'AI Product Design',
    'Product Designer',
    'UX Design',
    'UI Design',
    'Design Systems',
    'Enterprise UX',
    'SaaS Product Design',
  ],
  authors: [{ name: 'Shreay Goyal', url: siteUrl }],
  creator: 'Shreay Goyal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Shreay Goyal Portfolio',
    title: 'Shreay Goyal — Senior Product Designer | UX Strategist',
    description:
      'Designing AI-driven product experiences for SaaS and enterprise platforms used by global brands.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shreay Goyal — Senior Product Designer | UX Strategist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shreay Goyal — Senior Product Designer | UX Strategist',
    description: 'Senior Product Designer focused on SaaS, enterprise UX, and AI-driven product experiences.',
    images: ['/og-image.png'],
    creator: '@shreaygoyal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="bg-background text-slate-100 antialiased">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
