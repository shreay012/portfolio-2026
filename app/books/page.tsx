import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { CTASection } from '@/components/CTASection'
import { getCmsContent } from '@/lib/cms/get-cms-content'

export const metadata: Metadata = {
  title: 'Books',
  description: 'Books and long-form resources by Shreay Goyal on product design, career growth, AI UX, and strategic thinking.',
}

export default async function BooksPage() {
  const cms = await getCmsContent()

  return (
    <>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="max-w-3xl mb-20">
            <p className="section-label mb-6">Books</p>
            <h1 className="font-display font-extrabold text-white mb-5" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', lineHeight: '1.05', letterSpacing: '-0.035em' }}>
              Long-form thinking
              <br />
              <span className="gradient-text">for designers and builders</span>
            </h1>
            <p className="text-lg text-white/45 leading-relaxed max-w-2xl">
              Books and deeper resources on product design, career evolution, design systems, and creating user trust in complex digital products.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-4 mb-20">
            {cms.books.map((book) => (
              <StaggerItem key={book.slug}>
                <div className="card p-7 h-full">
                  <div className="w-12 h-16 rounded-2xl mb-5 border" style={{ background: `${book.accentColor}14`, borderColor: `${book.accentColor}24` }} />
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/25 mb-3">{book.category}</p>
                  <h2 className="font-display font-bold text-white text-2xl tracking-tight mb-3">{book.title}</h2>
                  <p className="text-white/42 leading-relaxed mb-6">{book.description}</p>
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/65 hover:text-white transition-colors">
                    Ask for the book
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
