import type { Project } from '@/lib/types'
import type { ResourceItem } from '@/lib/resources'

export interface CmsNavLink {
  href: string
  label: string
}

export interface CmsSocialLink {
  href: string
  label: string
}

export interface CmsHeroStat {
  value: string
  label: string
}

export interface CmsHeroContent {
  badge: string
  titleLeading: string
  titleHighlight: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  stats: CmsHeroStat[]
}

export interface CmsSiteContent {
  siteName: string
  logoLetter: string
  contactEmail: string
  navbarLinks: CmsNavLink[]
  footerLinks: CmsNavLink[]
  footerTagline: string
  footerSocials: CmsSocialLink[]
  hero: CmsHeroContent
  projects: Project[]
  tools: ResourceItem[]
  books: ResourceItem[]
  blogPosts: ResourceItem[]
}
