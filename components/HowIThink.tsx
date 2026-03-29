'use client'

import { AnimatedSection, StaggerContainer } from './AnimatedSection'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Problem Understanding',
    description:
      'I start with the business problem, not the design brief. Stakeholder interviews, competitor teardowns, and metric analysis before any pixel is touched.',
    tag: 'Research & Discovery',
  },
  {
    number: '02',
    title: 'User Behavior Mapping',
    description:
      'Qualitative research turned into behavioral models - jobs-to-be-done frameworks, journey maps, and friction audits that reveal where real drop-offs occur.',
    tag: 'UX Research',
  },
  {
    number: '03',
    title: 'Rapid Prototyping',
    description:
      'Fast, low-to-high-fidelity iteration to test hypotheses. Fail fast, validate early, build only what works.',
    tag: 'Ideation & Testing',
  },
  {
    number: '04',
    title: 'Scalable UI Systems',
    description:
      'Component libraries, design tokens, and documentation - not just screens. Every decision systematised so engineering ships fast without breaking consistency.',
    tag: 'Design Systems',
  },
]

export function HowIThink() {
  return (
    <section className="py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="mb-16 lg:mb-20">
          <p className="section-label mb-5">Process</p>
          <h2
            className="font-display font-extrabold text-white tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
          >
            How I think
            <br />
            about design
          </h2>
        </AnimatedSection>

        <StaggerContainer className="divide-y divide-white/[0.05]">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
                },
              }}
              className="group grid md:grid-cols-[120px_1fr_1fr] gap-6 lg:gap-12 py-10 hover:bg-white/[0.015] transition-colors rounded-lg px-2"
            >
              <div className="flex items-start gap-3">
                <span
                  className="font-display font-black text-[3.5rem] leading-none tracking-tighter tabular-nums"
                  style={{ color: 'rgba(255,255,255,0.07)' }}
                >
                  {step.number}
                </span>
              </div>

              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-white/25 mb-3 block">
                  {step.tag}
                </span>
                <h3 className="font-display font-bold text-xl text-white tracking-tight">{step.title}</h3>
              </div>

              <p className="text-white/45 leading-relaxed text-sm lg:text-base pt-1">{step.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
