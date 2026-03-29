import type { Metadata } from 'next'
import { ProjectsPageContent } from '@/components/ProjectsPageContent'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Case studies and selected projects by Shreay Goyal across AI, SaaS, enterprise UX, and growth-focused product design.',
}

export default function ProjectsPage() {
  return <ProjectsPageContent />
}
