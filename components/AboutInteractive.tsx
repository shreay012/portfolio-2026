'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Award, Heart, Zap } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { CTASection } from '@/components/CTASection'

const timeline = [
  {
    year: 'Jun 2025 - Present',
    role: 'Senior Associate UI/UX Designer',
    company: 'OrangeMantra, Gurugram',
    description:
      'Leading UX strategy for enterprise digital transformation platforms, building end-to-end journeys and scalable design systems. Delivered product improvements for BCG, Hero, TVS Motor, DTDC, Royal Enfield, and Panasonic.',
  },
  {
    year: 'Oct 2023 - Jun 2025',
    role: 'Senior UI/UX Designer',
    company: 'Telepathy Infotech Pvt. Ltd, Jaipur',
    description:
      'Designed UX for SaaS platforms and mobile products focused on engagement and usability. Conducted user research and integrated AI-assisted workflows to accelerate iteration speed.',
  },
  {
    year: 'Mar 2021 - Sep 2023',
    role: 'Senior Product Designer',
    company: 'CSI World Infotech LLP, Jaipur',
    description:
      'Led end-to-end design lifecycle for B2B and B2C products, including UX research, journey mapping, and scalable UI solutions optimized for accessibility and performance.',
  },
  {
    year: 'Oct 2019 - Mar 2021',
    role: 'Associate UX/UI Designer',
    company: 'WeDigTech, Jaipur',
    description:
      'Designed UX/UI for web and mobile applications, created production-ready prototypes, and collaborated closely with engineering to ensure implementation quality.',
  },
]

const values = [
  {
    id: 'ai',
    icon: Zap,
    title: 'AI-driven product experiences',
    description:
      'I integrate AI-assisted workflows and rapid experimentation to improve design velocity without compromising product quality.',
    detail:
      'I use AI where it increases learning speed: pattern discovery, variant testing, and rapid validation loops.',
    color: '#4F8CFF',
  },
  {
    id: 'growth',
    icon: Heart,
    title: 'Conversion-focused UX strategy',
    description:
      'My process combines user behavior analysis, UX metrics, and interaction design to increase engagement and usability.',
    detail:
      'Every major screen ties to a product metric, so design choices map to measurable behavior change.',
    color: '#7C5CFF',
  },
  {
    id: 'systems',
    icon: Award,
    title: 'Design systems for scale',
    description:
      'I build reusable component libraries and design systems that improve consistency and development efficiency across products.',
    detail:
      'Well-structured systems reduce QA churn, speed releases, and help teams keep product quality consistent.',
    color: '#10B981',
  },
]

const tools = [
  'Product Design', 'UX Strategy', 'Interaction Design', 'Information Architecture',
  'User Research', 'Design Systems', 'Component Libraries', 'UX Metrics',
  'Conversion Optimization', 'Wireframing', 'Prototyping', 'High-Fidelity UI',
  'SaaS & Mobile Product Design', 'Figma', 'Adobe XD', 'Photoshop',
  'AI-Assisted Design Tools', 'Agile', 'Product Discovery', 'Stakeholder Management',
]

const certifications = [
  'UX Deep Dive: Analyzing Data',
  'UX Research for Agile Teams',
  'Photoshop Essential Training',
]

const skillGroups: Record<string, string[]> = {
  Strategy: ['Product Design', 'UX Strategy', 'User Research', 'UX Metrics', 'Conversion Optimization', 'Product Discovery'],
  Execution: ['Interaction Design', 'Information Architecture', 'Wireframing', 'Prototyping', 'High-Fidelity UI', 'SaaS & Mobile Product Design'],
  Systems: ['Design Systems', 'Component Libraries', 'Agile', 'Stakeholder Management'],
  Tools: ['Figma', 'Adobe XD', 'Photoshop', 'AI-Assisted Design Tools'],
}

type SkillGroup = 'Strategy' | 'Execution' | 'Systems' | 'Tools'

export function AboutInteractive() {
  const [activeValue, setActiveValue] = useState(values[0].id)
  const [activeTimeline, setActiveTimeline] = useState(0)
  const [activeSkillGroup, setActiveSkillGroup] = useState<SkillGroup>('Strategy')

  const activeValueData = useMemo(
    () => values.find((item) => item.id === activeValue) ?? values[0],
    [activeValue]
  )

  return (
    <>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="grid lg:grid-cols-2 gap-16 items-start mb-28">
            <div>
              <p className="section-label mb-6">About</p>
              <h1
                className="font-display font-extrabold text-white mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', lineHeight: '1.05', letterSpacing: '-0.035em' }}
              >
                Designing products
                <br />
                <span className="gradient-text">that grow businesses</span>
              </h1>
              <div className="space-y-4 text-white/45 leading-relaxed text-[1.0625rem] mb-8">
                <p>
                  I&apos;m Shreay Goyal, a Senior Product Designer and UX Strategist with 8+ years
                  of experience designing SaaS, enterprise platforms, and mobile applications.
                </p>
                <p>
                  I specialize in AI-driven product experiences, design systems,
                  and conversion-focused UX that improves engagement, usability, and product growth.
                </p>
                <p>
                  I collaborate closely with product managers and engineering teams to deliver
                  scalable digital products used by global brands including BCG, TVS Motor,
                  Hero, Panasonic, DTDC, and Royal Enfield.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-black bg-white hover:bg-white/90 transition-colors"
                >
                  Work with me
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-medium text-white/60 border border-white/[0.12] hover:text-white hover:border-white/25 transition-colors"
                >
                  See my work <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <AnimatedSection delay={0.15}>
              <div className="card p-8">
                <h3 className="font-display font-bold text-white text-lg mb-6 tracking-tight">Quick Facts</h3>
                <dl className="space-y-0">
                  {[
                    { label: 'Based in', value: 'Gurugram, India' },
                    { label: 'Experience', value: '8+ years' },
                    { label: 'Current role', value: 'Senior Associate UI/UX Designer' },
                    { label: 'Current company', value: 'OrangeMantra' },
                    { label: 'Core focus', value: 'AI-driven product experiences' },
                    { label: 'Education', value: 'BBA, Suresh Gyan Vihar University' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-4 py-3.5 border-b border-white/[0.05] last:border-0">
                      <dt className="text-sm text-white/30 shrink-0">{label}</dt>
                      <dd className="text-sm text-white/70 text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <p className="section-label">What I believe</p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-8">
            {values.map((val) => {
              const Icon = val.icon
              const isActive = val.id === activeValue
              return (
                <StaggerItem key={val.title}>
                  <button
                    type="button"
                    onClick={() => setActiveValue(val.id)}
                    className={`card p-7 text-left w-full transition-all duration-200 ${isActive ? 'border-white/25 bg-white/[0.04]' : ''}`}
                    aria-pressed={isActive}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${val.color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: val.color }} />
                    </div>
                    <h3 className="font-display font-bold text-white mb-2 tracking-tight">{val.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{val.description}</p>
                  </button>
                </StaggerItem>
              )
            })}
          </StaggerContainer>

          <AnimatedSection className="card p-6 lg:p-7 mb-28">
            <p className="text-[11px] uppercase tracking-widest text-white/25 mb-2">Focus area</p>
            <h3 className="font-display font-bold text-white text-xl mb-2 tracking-tight">{activeValueData.title}</h3>
            <p className="text-white/50 leading-relaxed">{activeValueData.detail}</p>
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <p className="section-label">Career Timeline</p>
          </AnimatedSection>

          <AnimatedSection className="mb-8">
            <div className="flex flex-wrap gap-2">
              {timeline.map((item, i) => {
                const isActive = i === activeTimeline
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setActiveTimeline(i)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${isActive ? 'text-white border-white/30 bg-white/[0.06]' : 'text-white/45 border-white/[0.08] hover:text-white/70 hover:border-white/[0.14]'}`}
                    aria-pressed={isActive}
                  >
                    {item.year}
                  </button>
                )
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection className="card p-7 mb-28">
            <p className="text-xs text-white/35 mb-1">{timeline[activeTimeline].company}</p>
            <h3 className="font-display font-bold text-white mb-3 tracking-tight text-xl">{timeline[activeTimeline].role}</h3>
            <p className="text-sm text-white/45 leading-relaxed">{timeline[activeTimeline].description}</p>
          </AnimatedSection>

          <AnimatedSection className="mb-8">
            <p className="section-label">Core Skills & Tools</p>
          </AnimatedSection>

          <AnimatedSection className="mb-6">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(skillGroups) as SkillGroup[]).map((group) => {
                const isActive = activeSkillGroup === group
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setActiveSkillGroup(group)}
                    className={`px-3.5 py-2 rounded-lg text-xs uppercase tracking-wider border transition-colors ${isActive ? 'text-white border-white/30 bg-white/[0.06]' : 'text-white/45 border-white/[0.08] hover:text-white/70 hover:border-white/[0.14]'}`}
                    aria-pressed={isActive}
                  >
                    {group}
                  </button>
                )
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-16">
              {tools
                .filter((tool) => skillGroups[activeSkillGroup].includes(tool))
                .map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 bg-white/[0.04] border border-white/[0.12]"
                  >
                    {tool}
                  </span>
                ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-8">
            <p className="section-label">Certifications</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {certifications.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/35 bg-white/[0.03] border border-white/[0.07] hover:text-white/60 hover:border-white/[0.12] transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <CTASection />
    </>
  )
}
