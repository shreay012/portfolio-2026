import fs from 'fs/promises'
import path from 'path'
import { defaultCmsContent } from '@/lib/cms/default-content'
import type { CmsSiteContent } from '@/lib/cms/types'

const CMS_FILE_PATH = path.join(process.cwd(), 'content', 'cms', 'site-content.json')

async function ensureCmsFile() {
  const dirPath = path.dirname(CMS_FILE_PATH)
  await fs.mkdir(dirPath, { recursive: true })

  try {
    await fs.access(CMS_FILE_PATH)
  } catch {
    await fs.writeFile(CMS_FILE_PATH, JSON.stringify(defaultCmsContent, null, 2), 'utf-8')
  }
}

export async function readCmsContent(): Promise<CmsSiteContent> {
  await ensureCmsFile()

  try {
    const raw = await fs.readFile(CMS_FILE_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as Partial<CmsSiteContent>

    return {
      ...defaultCmsContent,
      ...parsed,
      hero: {
        ...defaultCmsContent.hero,
        ...(parsed.hero ?? {}),
        stats:
          Array.isArray(parsed.hero?.stats) && parsed.hero.stats.length > 0
            ? parsed.hero.stats
            : defaultCmsContent.hero.stats,
      },
      navbarLinks:
        Array.isArray(parsed.navbarLinks) && parsed.navbarLinks.length > 0
          ? parsed.navbarLinks
          : defaultCmsContent.navbarLinks,
      footerLinks:
        Array.isArray(parsed.footerLinks) && parsed.footerLinks.length > 0
          ? parsed.footerLinks
          : defaultCmsContent.footerLinks,
      footerSocials:
        Array.isArray(parsed.footerSocials) && parsed.footerSocials.length > 0
          ? parsed.footerSocials
          : defaultCmsContent.footerSocials,
      projects:
        Array.isArray(parsed.projects) && parsed.projects.length > 0
          ? parsed.projects
          : defaultCmsContent.projects,
      tools:
        Array.isArray(parsed.tools) && parsed.tools.length > 0
          ? parsed.tools
          : defaultCmsContent.tools,
      books:
        Array.isArray(parsed.books) && parsed.books.length > 0
          ? parsed.books
          : defaultCmsContent.books,
      blogPosts:
        Array.isArray(parsed.blogPosts) && parsed.blogPosts.length > 0
          ? parsed.blogPosts
          : defaultCmsContent.blogPosts,
    }
  } catch {
    return defaultCmsContent
  }
}

export async function writeCmsContent(nextContent: CmsSiteContent) {
  await ensureCmsFile()
  await fs.writeFile(CMS_FILE_PATH, JSON.stringify(nextContent, null, 2), 'utf-8')
}
