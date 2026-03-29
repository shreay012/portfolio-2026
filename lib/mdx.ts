import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { CaseStudy, CaseStudyFrontmatter } from './types'

const CASE_STUDIES_DIR = path.join(process.cwd(), 'content', 'case-studies')

function ensureDir() {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return false
  return true
}

export function getAllCaseStudySlugs(): string[] {
  if (!ensureDir()) return []
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  if (!ensureDir()) return null
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    frontmatter: data as CaseStudyFrontmatter,
    content,
  }
}

export function getAllCaseStudies(): CaseStudy[] {
  const slugs = getAllCaseStudySlugs()
  const studies = slugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((s): s is CaseStudy => s !== null)

  return studies.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((s) => s.frontmatter.featured)
}
