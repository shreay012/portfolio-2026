import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { CTASection } from '@/components/CTASection'
import { getCmsContent } from '@/lib/cms/get-cms-content'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and product insights by Shreay Goyal on UX strategy, growth, AI trust, and reducing friction in complex products.',
}

export default async function BlogPage() {
  const cms = await getCmsContent()

  return (
    <>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="max-w-3xl mb-20">
            <p className="section-label mb-6">Blog</p>
            <h1 className="font-display font-extrabold text-white mb-5" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', lineHeight: '1.05', letterSpacing: '-0.035em' }}>
              Ideas, methods, and
              <br />
              <span className="gradient-text">product thinking in public</span>
            </h1>
            <p className="text-lg text-white/45 leading-relaxed max-w-2xl">
              Notes on UX strategy, conversion design, AI interfaces, design systems, and the decisions behind better product experiences.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-20">
            {cms.blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <div className="card p-6 h-full">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/25 mb-3">{post.category}</p>
                  <h2 className="font-display font-bold text-white text-xl tracking-tight mb-3">{post.title}</h2>
                  <p className="text-white/42 text-sm leading-relaxed mb-6">{post.description}</p>
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/65 hover:text-white transition-colors">
                    Request article access
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
      <CTASection />
    </>
  )
}
