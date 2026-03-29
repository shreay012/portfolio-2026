import type { Metadata } from 'next'
import { ProjectsPageContent } from '@/components/ProjectsPageContent'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies and selected work by Shreay Goyal - product design, growth optimization, and design systems for startups and global brands.',
}

export default function WorkPage() {
  return <ProjectsPageContent label="Work" title="Case studies around real product outcomes" description="This route remains available as a legacy alias, while the primary structure now follows /projects." />
}
