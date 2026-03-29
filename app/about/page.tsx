import type { Metadata } from 'next'
import { AboutInteractive } from '@/components/AboutInteractive'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Senior Product Designer with 8+ years of experience in SaaS, enterprise platforms, and AI-driven product experiences.',
}

export default function AboutPage() {
  return <AboutInteractive />
}

