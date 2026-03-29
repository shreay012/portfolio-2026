import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer } from './AnimatedSection'
import type { ResourceItem } from '@/lib/resources'

interface ResourceShowcaseProps {
  eyebrow: string
  title: string
  highlight: string
  description: string
  href: string
  linkLabel: string
  items: ResourceItem[]
}

export function ResourceShowcase({
  eyebrow,
  title,
  highlight,
  description,
  href,
  linkLabel,
  items,
}: ResourceShowcaseProps) {
  return (
    <section className="py-28 lg:py-40 relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <p className="section-label mb-5">{eyebrow}</p>
            <h2
              className="font-display font-extrabold text-white mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              {title} <span className="gradient-text">{highlight}</span>
            </h2>
            <p className="text-white/45 leading-relaxed">{description}</p>
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white/80 transition-colors group shrink-0"
          >
            {linkLabel}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        <StaggerContainer className={`grid gap-4 ${items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {items.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="card p-6 group hover:border-white/[0.14] transition-colors"
            >
              <div
                className="w-11 h-11 rounded-2xl mb-5 border"
                style={{ background: `${item.accentColor}14`, borderColor: `${item.accentColor}24` }}
              />
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/25 mb-3">{item.category}</p>
              <h3 className="font-display font-bold text-white text-xl tracking-tight mb-3 group-hover:text-white/90">
                {item.title}
              </h3>
              <p className="text-sm text-white/42 leading-relaxed mb-6">{item.description}</p>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: `${item.accentColor}CC` }}
              >
                {item.cta}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
