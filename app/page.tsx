import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { FeaturedWork } from '@/components/FeaturedWork'
import { AboutPreview } from '@/components/AboutPreview'
import { HomeServices } from '@/components/HomeServices'
import { CTASection } from '@/components/CTASection'
import { ResourceShowcase } from '@/components/ResourceShowcase'
import { getCmsContent } from '@/lib/cms/get-cms-content'

export default async function HomePage() {
  const cms = await getCmsContent()

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedWork />
      <ResourceShowcase
        eyebrow="Tools & Resources"
        title="Tools I'm"
        highlight="building"
        description="Custom utilities and practical frameworks developed from live product work, audits, and growth-focused UX engagements."
        href="/tools"
        linkLabel="Explore tools"
        items={cms.tools}
      />
      <ResourceShowcase
        eyebrow="Library"
        title="Books and"
        highlight="long-form resources"
        description="Longer-form thinking on product design, AI trust, systems thinking, and the craft of building better digital experiences."
        href="/books"
        linkLabel="Explore books"
        items={cms.books}
      />
      <ResourceShowcase
        eyebrow="Latest Insights"
        title="Ideas and"
        highlight="articles"
        description="Notes from the field on UX strategy, product growth, interface clarity, and reducing friction in complex user flows."
        href="/blog"
        linkLabel="Read all posts"
        items={cms.blogPosts}
      />
      <AboutPreview />
      <HomeServices />
      <CTASection />
    </>
  )
}

