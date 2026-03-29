import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/lib/mdx'
import { CaseStudyLayout } from '@/components/CaseStudyLayout'
import { ProjectImage, ProjectImageRow } from '@/components/CaseStudyMedia'
import { ExperiencePanel, InteractiveProjectGallery } from '@/components/InteractiveProjectGallery'

interface PageProps {
  params: { slug: string }
}

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function flattenText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flattenText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return flattenText((node as { props?: { children?: React.ReactNode } }).props?.children)
  }
  return ''
}

function extractTableOfContents(content: string): TocItem[] {
  return content
    .split('\n')
    .map((line) => line.match(/^(##|###)\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      level: match[1] === '##' ? 2 : 3,
      text: match[2].trim(),
      id: slugifyHeading(match[2].trim()),
    }))
}

function estimateReadingTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const study = getCaseStudyBySlug(params.slug)
  if (!study) return {}

  const { title, description, tags } = study.frontmatter
  return {
    title,
    description,
    keywords: tags,
    openGraph: {
      title: `${title} — Case Study by Shreay Goyal`,
      description,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const study = getCaseStudyBySlug(params.slug)
  if (!study) notFound()

  const toc = extractTableOfContents(study.content)
  const readingTime = estimateReadingTime(study.content)

  const components = {
    h2: ({ children, ...props }: React.ComponentProps<'h2'>) => {
      const text = flattenText(children)
      const id = slugifyHeading(text)
      return <h2 id={id} {...props}>{children}</h2>
    },
    h3: ({ children, ...props }: React.ComponentProps<'h3'>) => {
      const text = flattenText(children)
      const id = slugifyHeading(text)
      return <h3 id={id} {...props}>{children}</h3>
    },
    h4: ({ children, ...props }: React.ComponentProps<'h4'>) => {
      const text = flattenText(children)
      const id = slugifyHeading(text)
      return <h4 id={id} {...props}>{children}</h4>
    },
    ExperiencePanel,
    InteractiveProjectGallery,
    ProjectImage,
    ProjectImageRow,
  }

  const mdx = await compileMDX({ source: study.content, components, options: {} })

  return (
    <CaseStudyLayout frontmatter={study.frontmatter} toc={toc} readingTime={readingTime}>
      {mdx.content}
    </CaseStudyLayout>
  )
}
