'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer } from './AnimatedSection'
import { motion } from 'framer-motion'

const services = [
  {
    id: 'ux-consulting',
    title: 'UX Consulting',
    description:
      'Audit your product experience, pinpoint drop-off moments, and prioritize the fixes that move business metrics fastest.',
    features: ['UX Audits', 'Heuristic Evaluation', 'User Research', 'Roadmapping'],
  },
  {
    id: 'ui-design',
    title: 'UI/UX Design',
    description:
      'From early flows to high-fidelity screens, I design complete product experiences that are ready for confident handoff.',
    features: ['Wireframing', 'High-fidelity UI', 'Interaction Design', 'Dev Handoff'],
  },
  {
    id: 'growth',
    title: 'Growth Optimization',
    description:
      'Design optimization for onboarding, pricing, checkout, and lifecycle flows using data-backed experimentation.',
    features: ['CRO Design', 'A/B Test Design', 'Funnel Analysis', 'Landing Pages'],
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    description:
      'Scalable design systems with tokens, reusable components, and clear documentation so teams ship faster with consistency.',
    features: ['Component Library', 'Design Tokens', 'Documentation', 'Figma Library'],
  },
]

export function HomeServices() {
  return (
    <section className="py-28 lg:py-40 relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div>
            <p className="section-label mb-5">Services</p>
            <h2
              className="font-display font-extrabold text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              What I <span className="gradient-text">deliver</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white/80 transition-colors group shrink-0"
          >
            See all services
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 } },
              }}
              className="card p-7 group"
            >
              <h3 className="font-display font-bold text-white text-xl mb-3 tracking-tight">{service.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-6">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feat) => (
                  <span
                    key={feat}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.05] border border-white/[0.08] text-white/45"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
