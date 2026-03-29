'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { AnimatedSection } from './AnimatedSection'

interface Stat {
  value: number
  suffix: string
  label: string
  description: string
}

const stats: Stat[] = [
  {
    value: 12,
    suffix: '+',
    label: 'Years of craft',
    description: 'Deep expertise across B2C, B2B SaaS, and marketplaces',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Brands shaped',
    description: 'Seed-stage startups to Fortune 500 enterprises',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Products shipped',
    description: 'End-to-end design from zero to launch',
  },
  {
    value: 95,
    suffix: '%',
    label: 'Client retention',
    description: 'Clients return for ongoing design partnerships',
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 1600
    const step = 16
    const totalSteps = duration / step
    const increment = value / totalSteps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, step)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span
      ref={ref}
      className="font-display font-extrabold tabular-nums"
      style={{
        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: '#FAFAFA',
      }}
    >
      {count}
      {suffix}
    </span>
  )
}

export function ImpactSection() {
  return (
    <section className="py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection className="mb-16 lg:mb-20">
          <p className="section-label mb-5">Impact</p>
          <h2
            className="font-display font-extrabold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
          >
            Numbers that matter
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
          {stats.map((stat) => (
            <div key={stat.label} className="group bg-[#060606] p-8 hover:bg-[#0F0F0F] transition-colors duration-200">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="font-display font-semibold text-white/80 mt-3 mb-1.5 text-lg">{stat.label}</p>
              <p className="text-sm text-white/30 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
