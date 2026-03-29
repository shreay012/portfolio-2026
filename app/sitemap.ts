import type { MetadataRoute } from 'next'
import { getAllCaseStudySlugs } from '@/lib/mdx'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shreaygoyal.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllCaseStudySlugs()

  const caseStudyUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${siteUrl}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/books`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${siteUrl}/work`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    ...caseStudyUrls,
  ]
}
