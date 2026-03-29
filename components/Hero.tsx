'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCmsContent } from '@/lib/cms/use-cms-content'

const ease = [0.16, 1, 0.3, 1]

export function Hero() {
  const cms = useCmsContent()
  const { hero } = cms

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-10 pt-24 pb-16 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(91,142,255,0.07) 0%, transparent 65%)',
        }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 bg-dots" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="section-label mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="font-display font-extrabold text-white leading-[1.0] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(3rem, 8vw, 5.75rem)' }}
        >
          {hero.titleLeading}
          <br />
          <span className="gradient-text">{hero.titleHighlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
          className="mt-7 max-w-xl text-lg text-white/45 leading-relaxed"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.28 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={hero.primaryCtaHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200"
          >
            {hero.primaryCtaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={hero.secondaryCtaHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.12] text-white/80 text-sm font-medium hover:border-white/25 hover:text-white transition-colors duration-200"
          >
            {hero.secondaryCtaLabel}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.44 }}
          className="mt-16 pt-10 border-t border-white/[0.06] w-full grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {hero.stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <span className="font-display text-3xl font-bold text-white tracking-tight">{value}</span>
              <span className="text-xs text-white/35 font-medium uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
