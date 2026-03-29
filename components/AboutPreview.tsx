import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const expertise = [
  { area: 'AI-Driven Product Design', tools: 'AI-assisted workflows, rapid iteration, scalable UX' },
  { area: 'SaaS & Enterprise UX', tools: 'Journey mapping, interaction design, feature validation' },
  { area: 'Design Systems', tools: 'Component libraries, design tokens, consistency at scale' },
  { area: 'Cross-Functional Collaboration', tools: 'Agile execution, product discovery, stakeholder alignment' },
]

export function AboutPreview() {
  return (
    <section className="py-28 lg:py-40 relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
          <AnimatedSection>
            <p className="section-label mb-6">About</p>
            <h2
              className="font-display font-extrabold text-white mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              Designing experiences
              <br />
              <span className="gradient-text">that drive adoption</span>
            </h2>

            <div className="space-y-4 text-white/45 leading-relaxed text-[15px] mb-8">
              <p>
                I&apos;m Shreay Goyal, a Senior Product Designer and UX Strategist with 8+ years
                of experience across SaaS, enterprise platforms, and mobile products.
              </p>
              <p>
                I specialize in AI-driven product experiences, scalable design systems,
                and conversion-focused UX that improves engagement and usability.
              </p>
              <p>
                I&apos;ve collaborated on products for global brands including BCG, TVS Motor,
                Hero, Panasonic, DTDC, and Royal Enfield.
              </p>
              <p>
                The result is product design that is both visually strong and{' '}
                <span className="text-white/80 font-medium">high-performing</span>.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white transition-colors group"
            >
              Read the full story
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <div className="divide-y divide-white/[0.05]">
              {expertise.map((item) => (
                <div key={item.area} className="py-5 group">
                  <p className="font-semibold text-white/80 group-hover:text-white transition-colors text-[15px] mb-1">
                    {item.area}
                  </p>
                  <p className="text-xs text-white/25">{item.tools}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
