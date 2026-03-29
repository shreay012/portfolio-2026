'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { CTASection } from '@/components/CTASection'

const services = [
  {
    id: 'ux-consulting',
    title: 'UX Consulting',
    tagline: 'Diagnose. Prioritize. Improve.',
    description:
      'For teams that have product traction but feel hidden friction in key journeys. I audit the full experience, identify revenue leaks, and build a clear improvement roadmap.',
    features: [
      'UX Audit (heuristic + analytics)',
      'Competitive Benchmarking',
      'User Research & Interviews',
      'Friction Map & Journey Analysis',
      'Prioritized Improvement Roadmap',
      'Executive Presentation',
    ],
    deliverables: 'Audit report, insight synthesis, prioritized roadmap',
    timeline: '2-4 weeks',
    color: '#5B8EFF',
  },
  {
    id: 'ui-design',
    title: 'UI/UX Design',
    tagline: 'Zero to launch, beautifully.',
    description:
      'End-to-end product design for new products, major features, or redesigns. From core flows to polished interfaces, with clear engineering handoff.',
    features: [
      'Discovery & Requirements Workshop',
      'User Flows & Information Architecture',
      'Low-fidelity Wireframes',
      'High-fidelity UI Design',
      'Interaction & Micro-animation Specs',
      'Developer Handoff (Figma + docs)',
    ],
    deliverables: 'Figma file, interactive prototype, handoff documentation',
    timeline: '4-12 weeks (scope dependent)',
    color: '#7B61FF',
  },
  {
    id: 'growth',
    title: 'Growth Optimization',
    tagline: 'Design that converts.',
    description:
      'Conversion-focused optimization for high-impact moments: acquisition, onboarding, pricing, and checkout. Built on behavioral insight and fast iteration.',
    features: [
      'Conversion Funnel Analysis',
      'Landing Page Redesign',
      'Onboarding Flow Optimization',
      'A/B Test Design & Hypothesis',
      'Checkout & Pricing Page Design',
      'Trust Signal Optimization',
    ],
    deliverables: 'Designs, experiment plan, analytics recommendations',
    timeline: '2-6 weeks per funnel',
    color: '#10B981',
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    tagline: 'Build once. Scale forever.',
    description:
      'A practical design system that lets teams ship quickly without losing consistency. Includes tokens, reusable components, standards, and governance.',
    features: [
      'Design Token Architecture',
      'Core Component Library (Figma)',
      'Pattern & Template Library',
      'Accessibility Standards (WCAG AA)',
      'Documentation & Usage Guidelines',
      'Developer Handoff Package',
    ],
    deliverables: 'Figma library, component specs, usage documentation',
    timeline: '6-12 weeks',
    color: '#F97316',
  },
]

const faqs = [
  {
    q: 'What is your typical engagement model?',
    a: 'Most projects start with a one-hour discovery call, followed by a scoped proposal. I work as a dedicated partner, not an agency handoff. You get direct access to me throughout.',
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Yes. Early teams move quickly, make decisions faster, and benefit the most from clear UX and growth priorities.',
  },
  {
    q: 'Can you work with our existing dev team?',
    a: 'Absolutely. I work directly with in-house teams and provide implementation-ready specs, edge-case coverage, and support during reviews.',
  },
  {
    q: 'What does a typical project cost?',
    a: 'Scopes vary widely. UX audits start around $2,000. Full product design engagements typically range $5,000-$25,000 depending on scope. Ongoing retainers are available.',
  },
  {
    q: 'Do you take on long-term retainer work?',
    a: 'Yes. Retainers are ideal when you need continuous product design support, iteration cycles, and strategic guidance.',
  },
]

export function ServicesInteractive() {
  const [activeServiceId, setActiveServiceId] = useState(services[0].id)
  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? services[0],
    [activeServiceId]
  )

  return (
    <>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="max-w-3xl mb-10">
            <p className="section-label mb-6">Services</p>
            <h1
              className="font-display font-extrabold text-white mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', lineHeight: '1.05', letterSpacing: '-0.035em' }}
            >
              Design as a
              <br />
              <span className="gradient-text">growth lever</span>
            </h1>
            <p className="text-lg text-white/45 leading-relaxed max-w-2xl">
              Every engagement is built around one objective: measurable improvement in metrics
              that matter to your business.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <div className="flex flex-wrap gap-2">
              {services.map((service) => {
                const isActive = service.id === activeServiceId
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${isActive ? 'text-white bg-white/[0.09] border-white/30' : 'text-white/45 border-white/[0.1] hover:text-white/75 hover:border-white/[0.2]'}`}
                    aria-pressed={isActive}
                  >
                    {service.title}
                  </button>
                )
              })}
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-[360px_1fr] gap-5 mb-28">
            <AnimatedSection>
              <div className="card p-4">
                <p className="text-[11px] uppercase tracking-widest text-white/25 mb-3 px-2">Service Explorer</p>
                <div className="space-y-2">
                  {services.map((service) => {
                    const isActive = service.id === activeServiceId
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setActiveServiceId(service.id)}
                        className={`w-full text-left rounded-xl px-4 py-3 border transition-colors ${isActive ? 'bg-white/[0.06] border-white/[0.24]' : 'bg-transparent border-white/[0.06] hover:border-white/[0.15]'}`}
                        aria-pressed={isActive}
                      >
                        <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">{service.tagline}</p>
                        <p className="font-semibold text-white/80">{service.title}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="card p-8 lg:p-10">
                <div className="grid lg:grid-cols-[1fr_240px] gap-8 lg:gap-12">
                  <div>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${activeService.color}15` }}>
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: activeService.color }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-1">
                          {activeService.tagline}
                        </p>
                        <h2 className="font-display font-extrabold text-white text-2xl lg:text-3xl tracking-tight">
                          {activeService.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-white/45 leading-relaxed mb-6 max-w-xl">{activeService.description}</p>

                    <div className="grid sm:grid-cols-2 gap-2">
                      {activeService.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5">
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: activeService.color }} />
                          <span className="text-sm text-white/45">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 lg:border-l lg:border-white/[0.05] lg:pl-10">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-white/25 mb-1">Deliverables</p>
                        <p className="text-sm text-white/55">{activeService.deliverables}</p>
                      </div>
                      <div className="pt-3 border-t border-white/[0.05]">
                        <p className="text-[11px] uppercase tracking-widest text-white/25 mb-1">Timeline</p>
                        <p className="text-sm text-white/55">{activeService.timeline}</p>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-white/90 transition-colors"
                    >
                      Discuss this service
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="max-w-2xl mx-auto">
            <h2
              className="font-display font-extrabold text-white mb-10 text-center"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.025em' }}
            >
              Frequently asked
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <details className="group card p-5 cursor-pointer hover:border-white/[0.14]">
                    <summary className="font-semibold text-white/70 group-hover:text-white cursor-pointer list-none flex items-center justify-between gap-4 transition-colors">
                      {faq.q}
                      <ArrowUpRight className="w-4 h-4 text-white/25 shrink-0 group-open:rotate-90 transition-transform duration-200" />
                    </summary>
                    <p className="text-sm text-white/40 leading-relaxed mt-4 pt-4 border-t border-white/[0.05]">
                      {faq.a}
                    </p>
                  </details>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <CTASection />
    </>
  )
}
