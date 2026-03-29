import type { Metadata } from 'next'
import { ServicesInteractive } from '@/components/ServicesInteractive'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'UX Consulting, UI/UX Design, Growth Optimization, and Design Systems by Shreay Goyal - product design that drives business results.',
}

export default function ServicesPage() {
  return <ServicesInteractive />
}
