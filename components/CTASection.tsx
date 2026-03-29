import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

export function CTASection() {
  return (
    <section className="py-28 lg:py-40 relative overflow-hidden border-t border-white/[0.05]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(91,142,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <AnimatedSection>
          <div className="section-label mx-auto mb-10 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Currently accepting new projects
          </div>

          <h2
            className="font-display font-extrabold text-white mb-6"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', lineHeight: '1.04', letterSpacing: '-0.035em' }}
          >
            Let&apos;s build something
            <br />
            <span className="gradient-text">that actually performs</span>
          </h2>

          <p className="text-lg text-white/40 leading-relaxed max-w-lg mx-auto mb-12">
            If your product feels stuck, let&apos;s find the real bottlenecks and design a faster path to growth.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-black text-sm bg-white hover:bg-white/90 transition-colors duration-200"
            >
              Book a Discovery Call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:hello@shreaygoyal.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white/70 text-sm border border-white/[0.12] hover:border-white/25 hover:text-white transition-colors duration-200"
            >
              Send an email
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
